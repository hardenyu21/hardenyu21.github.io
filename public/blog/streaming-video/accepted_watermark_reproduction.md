# 已录用视频水印在 LongLive 2.0 上的首轮复现与比较

新增：[未知边界拼接与无水印插入：VideoSeal / VideoShield / SIGMark（2026-09-30）](splice_insertion_experiment.md)。

新增：[VideoSeal 独立分段嵌入与多镜头拼接实验（2026-09-29）](videoseal_multishot_experiment.html)。

更新：2026-09-28。当前范围是流式视频的鲁棒 message 提取，不涉及用户归属判定或音频。Video Signature 按用户要求排除；历史 decoder pilot 不进入这轮比较。

## 1. 本轮完成了什么

完成 **VideoShield、SIGMark 官方消息编码／提取通道的 LongLive 接口移植，以及 REVMark 官方权重的后处理部署**。三者 clean 均能完整恢复消息；完成60个常规攻击条件、三种方法各一段视频的局部／全局 VACE 编辑，以及18个编辑与控制条件的提取。实际输出、消息、恢复噪声、提取概率、配置和耗时均已保存。

这是一轮**可运行性与原生工作点比较**：它能展示当前实现在哪里成功、在哪里失败，以及部署成本的差别；样本量、payload和冗余尚未匹配，不是对“生成内 vs 后处理”整个范式的排名。更换 backbone 后的实验称为移植复现，不声称重现原论文表格。SIGMark 的 SGO 同步流程、SPDMark 的 causal 3D routing 尚未实现。

## 2. 论文与实现边界

| 方法 | 已确认发表 | 官方资源 | 本轮状态 |
| --- | --- | --- | --- |
| VideoShield | [ICLR 2025](https://proceedings.iclr.cc/paper_files/paper/2025/hash/8227285e32f70e07fa3a247f3a48006d-Abstract-Conference.html) | [官方代码](https://github.com/hurunyi/VideoShield) | 25项编码决策检查通过；48-channel泛化与LongLive反演接口移植；3条独立消息 |
| SIGMark | [ICLR 2026](https://proceedings.iclr.cc/paper_files/paper/2026/hash/f3f6f1739b646e0bd20111261ce23adb-Abstract-Conference.html) | [官方代码](https://github.com/JeremyZhao1998/SIGMark-release) | 未修改官方PRC通道；3个prompt共享消息测试，另补2条独立消息；未接SGO |
| REVMark | [ACM MM 2023](https://doi.org/10.1145/3581783.3612270) | [官方代码及权重](https://github.com/yulinsysu/REVMark) | 原生crop检查及全帧平铺部署，网络／权重／强度不变 |
| SPDMark | [CVPR 2026](https://openaccess.thecvf.com/content/CVPR2026/html/Fares_SPDMark_Selective_Parameter_Displacement_for_Robust_Video_Watermarking_CVPR_2026_paper.html) | [官方代码](https://github.com/Samar-Fares/SPDMark) | 直接注入WanVAE_匹配0个block，不能原样运行；保留结构审计 |
| LVMark | TIFS 2026，发表依据见前期文献目录 | [官方项目](https://kuai-lab.github.io/lvmark2024/) | 核查时项目仍写代码将发布；未找到可直接复现的官方代码 |

发表及代码状态核实日期：2026-09-28。完整论文作者、单位及资源沿用[前期文献目录](streaming_literature_resources.md)。REVMark：Yulin Zhang、Jiangqun Ni、Wenkang Su、Xin Liao；题名 *A Novel Deep Video Watermarking Framework with Enhanced Robustness to H.264/AVC Compression*，8095–8104。单位依据出版社检索元数据为 Sun Yat-sen University、Peng Cheng Laboratory、Guangzhou University、Hunan University。

### 生成内：改噪声，不改生成网络

LongLive 2.0 5B BF16／Wan2.2，官方4-step UniPC，每段61帧、1280×704、24fps；latent为[1,48,16,44,80]。生成时真实保存两个因果输出chunk，分别29和32帧。cached VAE适配此前已与原生decode验证等价。

VideoShield 使用220-bit消息，channel／time／spatial重复为48／16／4×4，即每bit重复12288次。4-channel官方设置下，5消息×5种符号翻转概率的提取决策共25项一致；48-channel是形状泛化，半正态采样与官方截断正态同分布，不是逐样本RNG一致。

SIGMark 保留官方PRC编码、frame-wise keys、检测与解码。首latent不嵌入，其余15个latent承载220-bit消息，时间重复15次。持久化实际研究keys（约752 MiB），不只记录seed；隔离进程解决与LongLive同名模块冲突。初次编码通道自检约472秒，不能计作每视频成本。

两者提取都从待测uint8视频重新编码、重建历史，再作**50-step causal Euler反演、空prompt**。这既不是原论文DDIM管线，也不是精确UniPC逆过程。已知原尺寸、长度和起始位置；不提供真实latent或生成prompt给反演。SIGMark时间攻击仅采用官方直接提取，**没有原论文SGO的光流分段／滑窗对齐**。

### 后处理：官方网络加明确部署包装

REVMark 使用官方 Encoder／Decoder／SpyNet、BGR[-1,1]输入、8×128×128窗口、96-bit、强度6.2、TAsBlock enabled。先跑原生crop协议；再将原封不动网络用于全帧空间tile与8帧时间块，边界复制补齐、输出裁掉补齐部分。一个消息在各块重复，提取概率按tile和时间块平均。**该平铺是本项目部署包装，不是作者已验证的全分辨率协议。** 目前为离线顺序重放，未接真实在线生成回调；须积累8帧，不代表要等待整段视频。

SPDMark 官方routing仅匹配ResnetBlock2D／SpatioTemporalResBlock。WanVAE_含14个自定义ResidualBlock及34个CausalConv3d，官方注入匹配0个block／slot；其时间展平到2D batch的decode接口也不适配causal cache。需要新的3D接口与训练，按“先复现再适配”暂不改算法。见[结构证据](streaming_feasibility_evidence/accepted_baselines/spdmark_audit/architecture.json)。

## 3. Clean 与消息检查

| 设置 | 视频／窗口 | Payload | 完整恢复 |
| --- | ---: | ---: | ---: |
| VideoShield：3个prompt，独立消息 | 3 | 220 bit | 3/3 |
| SIGMark：3个prompt，共享原始消息 | 3 | 220 bit | 3/3 |
| SIGMark：额外独立消息 | 2 | 220 bit | 2/2 |
| REVMark：全帧平铺，各视频独立消息 | 4 | 96 bit | 4/4 |
| REVMark：官方crop形状，各窗口独立消息 | 21窗口 | 96 bit | 21/21 |

主实验消息与提取均从真实生成视频得到，不以编码自检替代。SIGMark额外两条消息复用官方keys重新编码并生成，和最初共享消息的3视频分开记录。见[VideoShield clean](streaming_feasibility_evidence/accepted_baselines/videoshield_longlive/clean_results.json)、[SIGMark clean](streaming_feasibility_evidence/accepted_baselines/sigmark_longlive/official_decode_results.json)、[SIGMark多消息](streaming_feasibility_evidence/accepted_baselines/sigmark_multimessage/official_decode_results.json)。

## 4. 常规攻击比较

各格为 **平均 bit accuracy / 完整消息恢复率**。为统一prompt集合，主表每格均为river／dog／street三个视频；不同方法生成像素不同，不能看成逐像素配对。REVMark另有pottery样本，完整4视频结果保存在原始记录。

| 攻击 | VideoShield 220 bit | SIGMark 220 bit | REVMark 96 bit |
| --- | ---: | ---: | ---: |
| H.264 CRF23 | 100.00% / 100.0% | 50.30% / 0.0% | 99.65% / 66.7% |
| H.264 CRF35 | 100.00% / 100.0% | 50.45% / 0.0% | 75.00% / 0.0% |
| 半尺寸缩放再恢复 | 100.00% / 100.0% | 85.00% / 66.7% | 100.00% / 100.0% |
| 中心80%边长裁剪再恢复 | 51.97% / 0.0% | 50.91% / 0.0% | 51.74% / 0.0% |
| 丢25%帧再恢复长度 | 100.00% / 100.0% | 100.00% / 100.0% | 100.00% / 100.0% |
| 仅前29帧再恢复长度 | 99.39% / 33.3% | 60.45% / 0.0% | 99.65% / 66.7% |

![常规攻击比较](streaming_feasibility_evidence/accepted_baselines/attack_comparison.png)

H.264采用libx264 medium、CRF23／35；缩放为双线性抗混叠0.5倍再恢复。裁剪保留中心80%边长，随后恢复原尺寸。丢帧删除每4帧中的第4帧；前缀攻击只保留前29帧；两者均最近邻均匀重采样至已知原长度61。三种方法调用同一攻击函数。这里没有高斯噪声凑攻击数量，也没有把这些长度恢复叫作盲同步。

VideoShield 在该高重复配置下对压缩、缩放和丢帧完整恢复；裁剪失败，前缀攻击则出现少量bit错误但显著降低完整恢复率。SIGMark的直接移植对部分处理更敏感，不能因此否定其原backbone或完整SGO设定。REVMark对缩放和丢帧表现较好，对强压缩和空间裁剪较弱。

恢复噪声诊断显示，两种噪声方法clean符号一致率约63–67%，CRF23约54–56%，CRF35约51–52%，crop约50%。相近的原始信号水平没有产生相同消息结果，说明编码／检测／聚合环节值得单独分析；“PRC在该接口下受低信号影响”是机制解释，尚不是已完成的消融。见[信号统计](streaming_feasibility_evidence/accepted_baselines/noise_signal_diagnostics.json)。

## 5. 真实 video edit 与控制

使用已核验的官方VACE 1.3B，50-step UniPC、shift16、CFG5、context1，61帧，在832×480编辑再还原1280×704。每种方法一段river视频，统一prompt、归一化mask、局部seed30001／全局seed30002。编辑器不接收水印消息、key或extractor。局部任务为加入红船；全局任务为秋季树林改色。局部合成仅在mask内替换生成结果；local_raw为编辑器整帧原始输出，两者不能混同。

| 条件 | VideoShield BA / 完整恢复 | SIGMark BA / 完整恢复 | REVMark BA / 完整恢复 |
| --- | ---: | ---: | ---: |
| 缩放往返控制 | 100.00% / 是 | 100.00% / 是 | 100.00% / 是 |
| 灰度控制 | 100.00% / 是 | 53.64% / 否 | 76.04% / 否 |
| VAE roundtrip控制 | 100.00% / 是 | 47.27% / 否 | 95.83% / 否 |
| 局部加船：编辑器原始输出 | 100.00% / 是 | 44.55% / 否 | 93.75% / 否 |
| 局部加船：mask内合成 | 100.00% / 是 | 65.45% / 否 | 100.00% / 是 |
| 全局秋季改色 | 100.00% / 是 | 50.91% / 否 | 47.92% / 否 |

三种方法均检查第0、15、30、45、60帧，局部红船和全局秋季改色在这些帧可见。[VideoShield对照](streaming_feasibility_evidence/accepted_baselines/visual_audit/videoshield_edits.png)、[SIGMark对照](streaming_feasibility_evidence/accepted_baselines/visual_audit/sigmark_edits.png)、[REVMark对照](streaming_feasibility_evidence/accepted_baselines/visual_audit/revmark_edits.png)。单视频成功率不具有总体统计意义。

VideoShield在该例六个条件均完整恢复。SIGMark的灰度／VAE重建控制已失败，因此不能把后续失败仅归因于语义修改。REVMark局部合成成功、local_raw失败，表明保护未编辑区域与编辑器重建整帧有明显区别；VAE控制也已产生bit错误。这个控制设计比仅报告“video edit攻击成功／失败”更能定位后续工作。

## 6. 画质、延迟与流式含义

REVMark嵌入前后PSNR约37 dB，已查看4视频代表帧的原图／水印图／10倍差分，微弱纹理扰动在差分可见。VideoShield／SIGMark各3视频抽查5个时刻，未见整体生成崩溃；**没有用不同随机噪声生成的两段视频计算PSNR来证明无损，也未用小样本FVD声称画质等价。** 全帧时序质量与匹配分布质量对照尚待下一阶段。

| 测量阶段 | 当前实测 | 解释 |
| --- | --- | --- |
| 噪声水印视频生成及保存 | 24.5–26.4秒／61帧 | 包含生成，不是单独水印开销 |
| 首29帧chunk可用 | 9.6–11.4秒 | 当前H20 BF16配置，非优化实时速度 |
| VideoShield／SIGMark反演 | 约88秒／61帧 | 50步模型反演；SIGMark另加PRC解码 |
| SIGMark clean PRC解码 | 约9秒 | 不含反演；受攻击时迭代耗时可能更长 |
| REVMark全帧嵌入计算 | 7.84–8.10秒／61帧 | 每8帧块约0.98–1.01秒，另有积累窗口 |

噪声水印的部署特点是避免单独RGB嵌入网络，保留生成器的分块输出；代价是当前提取依赖生成模型反演和对齐信息。REVMark不需要反演生成器，但增加像素处理与8帧缓存。首轮比较未隔离噪声构造成本；新增隔离补测见第9节。在线重叠流水线仍未实现，不能宣称生成内零成本或后处理必然无法流式。 见[计时记录](streaming_feasibility_evidence/accepted_baselines/timing_comparison.json)。本轮accepted方法主实验仅覆盖61帧／两chunk，不把历史长流decoder结果冒充本轮长流验证。

## 7. 当前结论与下一阶段

本轮证据支持：**生成内方案可以在LongLive真实分块生成中保留可提取message；其对编辑／压缩的优势需要逐方法、逐配置验证，同时计入昂贵反演。后处理也能分块部署，并在部分攻击上有竞争力。** VideoShield在当前高重复设置和单段编辑例上表现最好；它的空间同步、短观察窗口问题仍存在。这不是“所有生成内方法都比后处理鲁棒”的证据。

按先复现再适配的顺序，后续优先级为：先做共同有效payload／质量约束、更多独立消息与视频的对照；再研究空间／时间对齐、短chunk提取和长流漂移；对SIGMark补齐SGO及反演接口对照；若选择decoder路线，再实现SPDMark causal 3D routing与训练。组合攻击、真正长流／多镜头和完整时序画质评测属于后续扩展。当前没有把这些改动混入原方法结果。

## 8. 验证与复现资料

- 常规攻击60份uint8输入的哈希／尺寸均核对通过：[输入审计](streaming_feasibility_evidence/accepted_baselines/attack_input_audit.json)。
- 三方法全部60项攻击指标由保存的decoded message／scores重算；18项编辑指标同样重算：[攻击比较数据](streaming_feasibility_evidence/accepted_baselines/attack_comparison.json)、[编辑审计](streaming_feasibility_evidence/accepted_baselines/video_edit/message_audit.json)。这是指标重算，不声称独立推理复跑。
- REVMark原生crop的105个条件、全帧clean／压缩12条件另有审计：[原生](streaming_feasibility_evidence/accepted_baselines/revmark_native/audit.json)、[全帧](streaming_feasibility_evidence/accepted_baselines/revmark_fullframe/audit.json)。
- VideoShield编码检查：[25项记录](streaming_feasibility_evidence/accepted_baselines/videoshield_channel/audit.json)；SIGMark编码：[官方通道记录](streaming_feasibility_evidence/accepted_baselines/sigmark_channel/result.json)。
- [代码包](streamingmark_pilot_code.zip)：入口`REPRODUCE_ACCEPTED.md`，脚本与SHA256清单；[环境](streaming_feasibility_evidence/accepted_baselines/accepted_environment.json)、[官方源码状态](streaming_feasibility_evidence/accepted_baselines/upstream_worktree_status.json)。官方SIGMark／VideoShield／REVMark／SPDMark受跟踪源码均未改动。
- 大体积原始像素／恢复噪声／研究keys保存在H20 `/data/workspace/hardenyu/StreamingMark/results/accepted_baselines/`；编辑数据在`results/longlive2/video_edit/accepted_METHOD/`。本地保留可复算的消息／scores、配置、结果JSON和视觉对照；没有复制认证token。

网页阅读副本由本正文生成。本轮浏览器安全策略拒绝本地file协议，网页未完成渲染检查；结果图已直接打开检查，正文链接另行核对。


## 9. 补测：chunk-wise、overhead 与密钥／内存增长

2026-09-28，针对用户追问补充。**此前是整段水印噪声预构造，再由LongLive分chunk消费；不是按需逐chunk生成水印，也没有独立逐chunk提取。** `longlive_accepted_noise.py` 先构造/读取完整16-latent噪声，随后调用pipeline；VideoShield消息跨16个latent重复，SIGMark先对15个marked latent逐帧PRC编码。这一限定修正“流式生成兼容”可能引起的误解。

### 隔离 overhead 的实测

H20，61帧、1280×704、BF16、同一个river prompt；预热1次，三方法轮换顺序各测3次；不写视频、不做反演。纯推理阶段不包含噪声编码。VideoShield通道另测一次预热后5次；SIGMark用与前轮一致的CPU float32编码路径、复用持久化PRC keys，单独测5次。

| 项目 | 无水印 | VideoShield | SIGMark |
| --- | ---: | ---: | ---: |
| 纯生成中位数 | 19.4396秒 | 19.4426秒 | 19.4364秒 |
| 推理阶段峰值GPU allocated | 57.9720 GiB | 57.9724 GiB | 57.9722 GiB |
| 噪声／编码构造 | 0.395 ms | 2.832 ms | 498.5 ms（CPU，含其噪声采样） |

VideoShield构造比匹配float32 Gaussian基线增加约2.44ms；这是向量化adapter的通道开销，不代表官方逐元素SciPy采样实现的速度。纯生成差异在约0.02秒的运行波动内，不能从3次测量宣称零开销或速度提升。SIGMark的CPU编码、key加载和CPU→GPU传输不应被隐藏在预处理之外：表中498.5ms不含key初次生成/加载，也不含传输。原生无水印可直接采样BF16，本次微基线用float32再cast以匹配VideoShield精度路径，因此不是无水印最快实现比较。

VideoShield独立噪声构造的峰值GPU allocated为36.09MiB，普通噪声15.47MiB；额外约20.63MiB。这里包含构造时临时张量。整段模型运行时这项较小的瞬态开销被约58GiB模型/激活峰值掩盖。GPU数值是PyTorch allocated而非nvidia-smi总显存，未把CPU密钥算进GPU。

提取端仍是约88秒反演／段，SIGMark clean再加约9秒PRC解码；这次没有重新测反演。详见[通道原始计时](streaming_feasibility_evidence/accepted_baselines/overhead/videoshield_channel.json)、[生成9次记录](streaming_feasibility_evidence/accepted_baselines/overhead/generation_runs.json)、[SIGMark内存与编码](streaming_feasibility_evidence/accepted_baselines/overhead/sigmark_storage.json)。

### VideoShield：用户所指的线性增长，需要区分保存了什么

[官方嵌入脚本](https://github.com/hurunyi/VideoShield/blob/a61efa73abb15d30f50ee535c3301cea7dec3075/watermark_embedding_and_extraction.py#L83)确实逐视频保存 `m`、`watermark`、`key`、`nonce`。key为32 bytes、nonce为12 bytes。按视频数N，独立key/nonce注册表为44N bytes，加上索引/参数；100万视频的原始key/nonce为44MB（十进制），但数据库和序列化开销另计。这是持久化存储规模，不要求全部同时驻留RAM。

`m` 是整段展开的加密符号图，不是44-byte密码密钥。在当前48×44×80空间形状、uint8展开表示下，每个latent帧169KB左右；整段 `m` 与噪声缓冲均O(T)。按官方字段保存的LongLive形状序列化实测如下；这不是原4-channel论文配置的文件大小：

| RGB帧 / latent帧 | key+nonce | `m` 数组 | 官方字段式序列化文件 | 构造峰值GPU allocated |
| --- | ---: | ---: | ---: | ---: |
| 61 / 16 | 44 B | 2.578 MiB | 2.582 MiB | 36.09 MiB |
| 509 / 128 | 44 B | 20.625 MiB | 20.629 MiB | 289.50 MiB |
| 1021 / 256 | 44 B | 41.250 MiB | 41.254 MiB | 580.50 MiB |

因此若每视频保存完整 `m`，存储是O(NT)，61帧配置100万视频约2.7TB（十进制，仅按上述文件大小推算）。但**只做message提取，无需持久化原始 `m` 或真实message**：ChaCha20 key/nonce和重复布局即可解密恢复的符号并投票。本次隔离解码函数只接收这些信息，3个clean+18个攻击的21份恢复噪声，其决策与原结果完全一致：[核验](streaming_feasibility_evidence/accepted_baselines/overhead/compact_key_decode_audit.json)。真实message仅在函数外用于评价，不参与决策。tamper localization参考模板、检索/归属任务有不同需求，不能直接套用这一存储结论。

当前adapter实际按视频保存含message的研究JSON，另存完整noise/latent用于审计；后者是实验留档，不是最小在线提取状态。默认实验直接提供正确key，未测从海量未知key中定位候选的成本；盲选key属于另一项必须明确的服务接口问题。

### SIGMark：逐latent帧PRC keys 是更大的常驻状态

当前15组PRC keys文件788,014,471 bytes，即751.51MiB。单次加载约0.284秒，CPU RSS由852.72MiB增至1602.24MiB，增量749.52MiB。总进程RSS含Python/PyTorch依赖；序列化基准额外创建大内存buffer，其进程最高RSS不能当作编码器常驻需求。

从现有key bank取1/2/4/8/15组、保留encoding+decoding字段序列化的实测：

| marked latent key组数 | 文件大小 |
| ---: | ---: |
| 1 | 50.10 MiB |
| 2 | 100.20 MiB |
| 4 | 200.40 MiB |
| 8 | 400.80 MiB |
| 15 | 751.51 MiB |

近似每marked latent增加50.10MiB。按同形状/码参数外推，509 RGB帧（127个marked latent）约6.21GiB，1021帧约12.48GiB；这是外推，未生成这些长流key bank。不要把每帧key都存成一个短seed便声称解决问题：PRC矩阵仍需生成/加载，且与帧索引检测相关。

SIGMark官方 `main.py` 按setting加载同一 `maintained_info.pkl`，本实验也跨视频复用bank。因此该bank在当前设置是**O(T)，而非必然O(NT)**；若另行要求每视频/用户独立bank，才额外乘以N。消息记录仍随N增加。

### 对真正流式适配的含义

下一阶段需要把“已知总长度、整段预分配”的通道变成有界chunk工作集，同时明确全局帧/块索引和提取窗口。VideoShield当前按BCTHW展平，通道偏移依赖总T，不能简单切掉数组就称为无限流；可研究按chunk寻址的keystream或主密钥+stream/chunk标识派生，但同步与安全性需另验证。SIGMark需处理PRC bank随时间增长，以及SGO候选搜索代价。当前没有实现这些改动，前轮鲁棒性结果仍对应整段预构造协议。


## 10. 为什么现有方法能在当前流式生成实验中 work

本轮没有训练新的水印网络，也没有把原方法变成严格在线水印。实际完成的是：将已编码的完整初始噪声交给因果生成器，再为输出视频接入与LongLive接口一致的近似反演；在已知尺寸、长度、起始位置及正确key的条件下聚合恢复消息。生成按chunk运行，水印准备和最终消息判决仍按整段运行。

### 10.1 流式因果性并不自动消除初始噪声中的信息

LongLive的每个chunk仍从噪声开始，经flow模型生成latent，只是条件中增加此前chunk的KV状态；RGB解码又依赖此前VAE卷积cache。水印改变的是当前噪声的符号统计，不要求生成器用未来chunk。因此结构化噪声可以被原生分块生成消费，生成器权重和4-step UniPC未因水印而改变。兼容这个输入接口不等于已证明噪声一定可逆或水印一定鲁棒；后者依赖实际提取结果。

VideoShield先重复消息，再用ChaCha20加密成近似随机的符号图e，以z=(2e−1)|g|构造初始噪声。在符号独立均匀、幅值为标准高斯绝对值的理想条件下，z保持标准高斯分布；实际伪随机编码的安全/不可检测性不能由本轮小样本画质检查证明。SIGMark以官方PRC编码产生符号码字，同样结合高斯幅值；两者不要求生成器显式识别message。

### 10.2 让当前接口跑通的具体改动

| 操作 | 实际实现 | 作用与证据边界 |
| --- | --- | --- |
| 对齐latent形状 | VideoShield官方4-channel泛化到48-channel；明确BCTHW与BTCHW转换。SIGMark参数化到48×16×44×80，首latent不嵌入 | 避免把时间/通道轴及VAE压缩率接错；SIGMark保留官方PRC算法 |
| 设置重复布局 | VideoShield用48×16×4×4重复一个220-bit消息；SIGMark15个marked latent用逐帧keys并重复同一220-bit消息 | 为恢复提供大量冗余；不是高payload、逐chunk不同消息的验证 |
| 向量化采样 | VideoShield用abs(randn)乘符号代替逐元素SciPy截断高斯采样 | 分布等价的计算替换，不是逐样本RNG相等；速度数据对应此adapter |
| 接入生成器 | 完整水印噪声传入pipeline.inference，再由原生8-latent分块生成 | 没有改生成器权重、注意力因果性或4-step采样器；整段noise仍预分配 |
| 接通cached VAE | 保留逐latent解码的feat_map、卷积索引、first-chunk状态和缩放，补充当前checkpoint管线缺失的cached_decode接口 | 已有与原生decode等价检查；这修复流式解码接口，不是嵌入水印的位置 |
| 编写因果反演接口 | 待测uint8→WanVAE encode→按8-latent块作50-step causal Euler；匹配attention/sink配置与时间位置，逐块刷新历史KV | 非原论文DDIM或精确UniPC逆过程；是本轮关键提取移植 |
| 固定观察协议 | 正确key、已知原尺寸/长度/起始位置；时间攻击恢复61帧，空间攻击恢复原尺寸；整段结果聚合 | 有利于恢复；不属于blind synchronization或未知key搜索 |

相关代码入口：`scripts/longlive_accepted_noise.py`、`scripts/videoshield_adapter.py`、`scripts/longlive2_utils.py`。所有修改与固定官方源码信息在现有代码包中。

### 10.3 因果反演做了什么，没有做什么

每个待测视频先经VAE编码为观测latent h_hat。反演从时间0走向1，做50次Euler更新：z(t+Δt)=z(t)+Δt·v_theta(z(t),t,空prompt,历史KV)。一个块结束后，用该块的观测h_hat在t=0刷新KV，再处理下一块，以保持后续块的历史条件接口。

这里的history和初始待反演latent都来自**同一份待测视频**，包括受攻击视频；不传入生成时保存的真实latent、初始噪声或原prompt。保存的真实噪声只在提取完成后的诊断中计算相关性。若攻击破坏历史，误差也会影响后续块，当前方法没有解决这种长期误差传播。

这只是有实测支撑的近似接口：生成用4-step UniPC，反演用50-step Euler，且prompt为空，两条轨迹不一致。因此不能声称恢复原始噪声。clean原始符号一致率约63–67%，正说明它只恢复了足够的相关性。尚未通过移除历史、减少反演步数等消融证明每个接口选择的独立贡献。

### 10.4 为什么不精确反演还能完整恢复message

VideoShield每个bit重复48×16×4×4=12,288次。恢复噪声取符号，经相同ChaCha20 keystream异或后，原符号错误仍对应重复消息位置上的bit错误；最后按原重复布局多数投票。它需要每个消息bit的有效投票中保留正确偏向，不需要恢复所有噪声坐标。clean有约三分之二符号正确时可以全消息恢复；压缩后总体符号正确率接近51–52%仍有成功案例，与大量冗余有关，但不能用独立同分布错误假设保证所有攻击都成功。

SIGMark则先从连续恢复噪声形成soft posterior，检测候选帧key，再作PRC解码和时间聚合。key识别、码结构与后验质量都可能影响恢复，所以同样的全局符号一致率不意味着同样的消息正确率。当前SIGMark的压缩/重建失败已经说明，能做clean提取不等于已完整适配。没有接入SGO，也没有用针对LongLive重新训练的解码器补救。

裁剪失败与机制一致：原噪声位置和keystream位置失配，解密后的有效正确偏向消失，原始符号一致率接近50%。局部编辑成功可能依赖未受充分破坏的区域/时刻及高重复；本轮没有证据证明水印被绑定到语义主体，也没有做足够消融来分离这些贡献。

REVMark无需上述噪声反演，它直接修改已生成RGB。8帧网络本来就能局部执行；本轮额外采用空间tile和时间重复、概率聚合，提高完整视频恢复率。它是对流式输出的有限窗口后处理，尚未接在线回调；其成功不能归因于生成器学会了水印。

### 10.5 本轮“work”的准确含义

已证明：在61帧、两个因果chunk、高重复、正确key及已知布局下，现有通道可嵌入并从视频近似反演/解码，且部分攻击后仍能恢复。尚未证明：未知总长度的on-demand编码、每chunk独立message与即时提取、固定内存无限流、跨场景/长期KV漂移的稳定恢复、盲时间同步或未知key搜索。

因此本轮最重要的工程改动是**噪声接口与因果反演接口接通**，最重要的恢复条件是**高冗余与对齐的观察协议**；不是训练出了新的流式水印机制。
