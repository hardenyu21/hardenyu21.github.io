# 拼接与无水印片段插入：生成内水印和 VideoSeal 的验证

更新：2026-09-30。30个方法×条件，固定窗口提取，不向提取流程提供真实切点。

**本轮没有观察到生成内水印对未知边界拼接的天然优势。** 三镜头盲扫描中VideoSeal候选覆盖全部3条message，VideoShield覆盖2条；同时两者都输出错误候选。无水印插入和多message冲突的影响不同，不能用一个“噪声比例”概括。SIGMark完整结果与未接SGO的实现边界见主表。

## 1. 这次检验的具体问题

“独立生成后分别加水印，再由agent拼接”的风险应分为：①其他片段承载不同message；②无水印片段稀释目标信号；③插入改变时序对齐。不能把三者统称为加噪声，也不能先认定它们仅影响后处理水印。

复用LongLive 2.0 5B的river/dog/street三段独立视频，每段61帧、704×1280、24fps。每方法三条不同message；插入/替换对照围绕river A展开，无水印素材为已有未加水印dog视频。VideoSeal输入来自未加水印生成输出；VideoShield与SIGMark输入来自此前水印噪声生成。三者内容语义相近，像素并不完全相同。

**主协议：**61帧固定窗口、步长16，再补视频末尾最后一个完整窗口。窗口调度函数只有观测帧数作为输入；不输入真实切点、镜头数量、message、shot labels，也不按真值选候选。61帧是现有噪声通道的固定注册形状，本轮源视频也恰为61帧，因此长度多样性尚未验证。末尾窗口依赖视频结束信息，这是一轮离线盲扫描，不是无延迟在线算法。

提取端所有候选先落盘，评分器再与真值比较。本轮仍没有独立标定的接受／拒绝规则；**下文“找回”只表示正确message出现在全部候选中，不等于验证者能可靠接受它。**

### VideoShield原版能力与本实验适配的区分（2026-09-30源码核对）

本报告表中的VideoShield指 **VideoShield噪声水印通道 + LongLive反演适配 + 61帧固定窗口扫描**。它不是原版任意长度提取接口；以下数值保留，但不能据此声称原版已支持未知边界下增删帧后的盲message恢复。

官方watermark.py的stream_key_decrypt在第103行固定reshape到(1,4,self.num_frames,self.height,self.width)，diffusion_inverse再按原始帧数与重复布局分组投票。时间长度是初始化参数，并非所有实验都只能用同一个帧数；但对一个已嵌入实例，布局固定。观测latent帧数变化时直接调用会shape不匹配；即使强行恢复长度，ChaCha20密钥流的位置对应也未自动恢复。[官方固定布局解码源码](https://github.com/hurunyi/VideoShield/blob/a61efa73abb15d30f50ee535c3301cea7dec3075/watermark.py#L98-L163)。

原论文§2.4.1另有template-based temporal tamper localization。官方脚本加载wm_info.bin中的完整m，独立使用观测帧数f和模板帧数t_f构造两两匹配，低于0.55标为新帧。脚本确实实现frame insert/drop，但各只随机插入或删除1帧，最终仅计算Localization accuracy（排除首帧）；没有把对齐结果送回eval_watermark验证完整message恢复。因此“论文完全不处理增删帧”不准确，“已证明增删帧后盲提取message”也不准确。[官方攻击与定位脚本](https://github.com/hurunyi/VideoShield/blob/a61efa73abb15d30f50ee535c3301cea7dec3075/temporal_tamper_localization.py#L29-L47)，[模板加载、匹配与指标](https://github.com/hurunyi/VideoShield/blob/a61efa73abb15d30f50ee535c3301cea7dec3075/temporal_tamper_localization.py#L114-L171)。

我们先前的drop25_restore/prefix29_restore在攻击后按已知原始长度重采样回61帧；本轮插入保持总长度变化，但提取端每次只处理61帧窗口，对应固定16个latent，decode_vs仍显式检查注册shape。因此这些流程绕开了可变shape输入，并没有解决一般的时序同步。插入成功可能由仍对齐的部分和冗余支持；目前没有针对VideoShield做逐latent归因，不能断言插入之后的部分也恢复了同步。本次是源码与协议核对，没有重跑GPU或改变已保存候选。

## 2. 主结果：所有盲窗口的候选集合

每格格式为“找回message数 / 实际message数；错误不同候选数”。完全相同的候选去重，真值只用于事后评分；错误候选数不是正式误接受率。SIGMark官方解码异常会留下空候选并单独计数，不能作为经过校准的拒绝。

| 条件 | VideoSeal | VideoShield | SIGMark，未接SGO |
| --- | --- | --- | --- |
| 原始 A | 1/1；错0 | 1/1；错2 | 1/1；错0 |
| 拼接 A+B | 2/2；错2 | 2/2；错13 | 2/2；错2 |
| 拼接 A+B+C | 3/3；错4 | 2/3；错25 | 2/3；错6 |
| 插入无水印13帧 | 1/1；错0 | 1/1；错4 | 1/1；错0 |
| 插入无水印29帧 | 1/1；错0 | 1/1；错7 | 1/1；错1 |
| 插入无水印61帧 | 1/1；错1 | 1/1；错13 | 1/1；错3 |
| 替换15/61帧 | 1/1；错0 | 1/1；错2 | 0/1；错1 |
| 替换31/61帧 | 1/1；错0 | 0/1；错3 | 0/1；错1 |
| 替换46/61帧 | 1/1；错0 | 0/1；错3 | 0/1；错1 |
| 纯无水印对照 | 无目标；错1 | 无目标；错3 | 无目标；错1 |

VideoShield每个窗口固定尝试同一注册库中的三组实例密钥；这不是按真值挑正确key，但给予了小型已知key registry，不覆盖未知规模的密钥检索。VideoSeal无实例key搜索；SIGMark复用同一个15组PRC key bank。key策略、有效payload（VS/SIG 220bit vs VideoSeal 256bit）与冗余不同，因此不据此做范式排名。

## 3. 不同message拼接时，窗口位置有什么影响

A+B为122帧，固定窗口起点0、16、32、48、61；A+B+C为183帧，起点0、16、32、48、64、80、96、112、122。算法没有看到切点61/122：首尾恰好包含完整A/B或A/C是窗口规则与本例长度共同造成的，不能当作普遍同步能力。中间B的61起点没有被三镜头扫描命中。

三段原始clean视频的message此前均可完整恢复。因此，如果拼接后某条message没有在这些候选中出现，不能断言它的水印信号已经消失；可能是有限步长、VAE分组、反演上下文或聚合未对齐。测试所有逐帧窗口或使用盲同步模块属于另一种算法／成本设定，本轮没有事后加入有利切点。

![三镜头逐窗口诊断](streaming_feasibility_evidence/splice_insertion/splice_windows.png)

图中真值仅用来画bit accuracy。VideoShield各行显示固定registry中相应实例key下的候选，没有用最大BA选择key。横轴是盲扫描实际起点。

## 4. 无水印内容：插入与替换的区别

插入将完整13/29/61帧无水印片段放在A第29帧之前，保留所有原帧、不恢复时间长度；无水印占比分别约17.6%、32.2%、50%。替换在61个原位置中均匀选15/31/46个位置，用无水印dog对应帧覆盖，时序长度不变；占比约24.6%、50.8%、75.4%。替换同时造成强烈内容跳变，不能看作只改变水印强度的纯消融。

VideoSeal整段聚合的额外对照：本例三种插入和三种替换均完整恢复256bit。盲窗口扫描的表现见主表。这是单一目标视频/无水印素材配对，不能外推所有内容或任意更高比例；本轮没有搜索更高比例下的失败阈值。

对于逐帧logits聚合，混合结果恰是各段logits和的加权组合。不同message可能提供相反的bit证据；无水印片段则没有被训练为指定的相反message，其输出仍可能有内容相关偏置。后者能否淹没目标，要实测分数幅度、偏置与保留信号，不能仅按帧数推断。

## 5. 为什么生成内方法也可能受影响

**VideoShield：**当前移植在初始噪声符号中重复编码message，再用ChaCha20流加密。解码需要把恢复出的符号与对应位置的密钥流对齐；多镜头独立重启编码、截取偏移、causal VAE时间分组变化，都可能改变对应关系。较高重复度能补偿部分坏观测，但不是自动同步。其他实例使用不同key，因此在目标key下可能更像不相关干扰；若出现收益，不能只归因于嵌入发生在生成内部。

**SIGMark：**PRC key提供帧组索引识别和纠错，而官方论文还专门设计了SGO来恢复causal VAE帧组。当前LongLive移植保留官方PRC提取，未接SGO；窗口从错位像素重新VAE编码时，PRC面对的信号已经可能变化。官方extract_watermark按一个message输出，不是现成的任意多message集合接口。本轮结果评价直接移植与固定扫描，不能用来宣称完整SIGMark论文方案在相同攻击下失败。

**共同问题：**独立片段的边界未知、多message输出、错误候选筛除，与水印是在生成前/中还是生成后嵌入不是同一个维度。若agent在各段统一写入同一任务message，生成内与后处理都能减少message冲突；若后处理允许在最终剪辑后统一嵌入，它还能直接覆盖组装结果。这个部署选择与“先分段嵌入后拼接”必须分开。

## 6. 配置、异常与审计

VS/SIG反演均为已验证的LongLive适配：Wan2.2 causal VAE，50步Euler、空prompt、每窗口从观测视频重建history/cache，无原始latent或噪声输入。模型生成时4-step UniPC没有改为50步；反演是近似过程。窗口61帧对应16 latent，不使用攻击后的真实帧映射。与既有clean观测SHA256完全一致的窗口复用已保存反演，其余实际重新反演。

| 方法 | 窗口调用（含重复观测） | 唯一像素窗口 | 官方解码失败窗口调用 |
| --- | ---: | ---: | ---: |
| VideoSeal | 29 | 24 | 0 |
| VideoShield | 29 | 24 | 0 |
| SIGMark (no SGO) | 29 | 24 | 0 |

本轮SIGMark所有窗口均返回了候选，包括纯无水印输入；返回一个220-bit向量不等于消息正确，也不等于通过水印存在性验证。纯无水印只有一段，不足以估计视频级FPR。窗口重叠，不是独立样本。

VideoShield未使用原始完整m或已知message模板来做时间定位；原论文的template-based时序篡改定位不等于本轮无模板、无切点提取。当前方法之间的同步模块接入程度不同，是结果解释的一部分。

计算成本：42个新反演窗口的wall time中位数为91.15秒/61帧窗口，范围90.79–182.44秒；记录包含VAE编码、反演与保存，首次还包括模型加载，SIGMark的CPU PRC解码另计。四个H20各运行一个worker。该数字是实际运行记录，不是隔离的水印overhead基准；更密的盲窗口搜索会增加反演成本。

### SIGMark逐latent诊断：信息保留与整段输出分开看

固定抽查9个窗口，沿用官方posterior、key argmax与PRC解码，保存聚合前每个latent的结果；这不改变主表输出，也未用真值挑选可接受候选。每个窗口有15个供PRC解码的latent槽位，首latent按官方流程跳过。

| 条件 / 窗口起点 | 完整解出A / B / C的latent数 | 未返回message的latent数 |
| --- | --- | ---: |
| clean / 0 | 15 / 0 / 0 | 0 |
| insert_u13 / 0 | 7 / 0 / 0 | 0 |
| insert_u29 / 0 | 7 / 0 / 0 | 0 |
| insert_u61 / 0 | 7 / 0 / 0 | 0 |
| replace_u15 / 0 | 1 / 0 / 0 | 0 |
| replace_u31 / 0 | 0 / 0 / 0 | 0 |
| replace_u46 / 0 | 0 / 0 / 0 | 0 |
| splice3 / 64 | 0 / 0 / 0 | 0 |
| unmarked / 0 | 0 / 0 / 0 | 0 |

例如insert_u29和insert_u61的第0窗口仍有7个latent完整恢复A（索引1–7，对应插入点之前保留对齐的前缀）；因此本轮插入成功不能证明后半段也已正确同步。这提示可以研究按完整message一致性聚合，避免把不相关输出直接逐bit投票。但这种策略尚未实现和独立标定，不能将诊断中的正确latent当作验证端已经识别出的可靠消息。

[逐latent诊断数据](streaming_feasibility_evidence/splice_insertion/sigmark_latent_diagnostic_scores.json)。

## 7. 下一步实验应回答什么

先在独立视频和message上标定盲接受规则，加入长度不一、未知message数量、无水印混拼及负例，再报告正确message召回、错误接受和时间／计算开销。对生成内方法，应分别消融时间同步（例如SIGMark SGO适配）、窗口扫描密度和单窗口反演开销；不要把真实边界偷偷放回提取器。对VideoSeal，应检查不同message的候选合并与拒绝规则。双方使用一致有效payload和质量预算后，才比较范式优势。

## 8. 数据与复现

- [逐条件JSON](streaming_feasibility_evidence/splice_insertion/summary.json) · [CSV](streaming_feasibility_evidence/splice_insertion/summary.csv) · [逐窗口事后评分](streaming_feasibility_evidence/splice_insertion/window_scores.json) · [预先固定协议](streaming_feasibility_evidence/splice_insertion/protocol.json) · [输入与调度审计](streaming_feasibility_evidence/splice_insertion/input_audit.json)。
- 每方法cases目录保存固定windows.json、观测构造元数据；windows目录保留所有候选、反演状态、SIGMark解码状态。真值单独保存在truth_messages.npy与evaluator_truth.json。VideoShield decoder_registry只有key/nonce/布局，没有message。
- 完整观测RGB和恢复噪声保留H20 `/data/workspace/hardenyu/StreamingMark/results/longlive2/splice_insertion`；本地证据目录同步候选、logits、消息、索引、配置与哈希。
- [复现代码包](streamingmark_pilot_code.zip) 的splice_insertion目录包含脚本与运行说明；复用模型/软件版本见[已录用方法移植报告](accepted_watermark_reproduction.md)和[VideoSeal报告](videoseal_multishot_experiment.md)。

方法来源核对于2026-09-30：[VideoShield官方代码，ICLR 2025](https://github.com/hurunyi/VideoShield)、[SIGMark官方代码，ICLR 2026](https://github.com/JeremyZhao1998/SIGMark-release)、[SIGMark论文§3.4：SGO与盲提取](https://arxiv.org/html/2603.02882v1)、[VideoSeal官方代码](https://github.com/facebookresearch/videoseal)。完整作者、单位、论文与模型资源见[既有文献目录](streaming_literature_resources.md)。
