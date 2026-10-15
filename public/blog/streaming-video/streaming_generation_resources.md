# 流式视频生成：文献与官方资源

共43篇：36篇生成／解码／系统研究，7篇基础读物。更新于2026-10-15。本轮新增16篇，Causal Forcing++精读更新至v4；其余旧条目的发表状态保留原核实日期。正文见[流式视频生成综述](index.html)。

新条目作者来自arXiv元数据，单位核对论文署名。未找到不等于尚未公开；项目页、代码仓库、模型仓库和数据仓库分列，基座依赖不冒充本方法的新资源。

## 1. FIFO-Diffusion: Generating Infinite Videos from Text without Training

- 作者：Kim, Jihwan；Kang, Junoh；Choi, Jinyoung；Han, Bohyung
- 单位：Seoul National University。[论文全文](https://arxiv.org/html/2405.11473v4)
- 发表状态：NeurIPS 2024。[核实来源](https://proceedings.neurips.cc/paper_files/paper/2024/hash/a397986e0f34d4b1f0b640686ceaeff7-Abstract-Conference.html)；核实于2026-09-27。
- 初次提交：2024-05-19；所读版本日期：2024-11-03。
- [论文](https://arxiv.org/abs/2405.11473) · [全文](https://arxiv.org/html/2405.11473v4)
- 项目主页：[入口1](https://jjihwan.github.io/projects/FIFO-Diffusion/)
- GitHub：[入口1](https://github.com/jjihwan/FIFO-Diffusion_public)
- Hugging Face模型：核实时未找到
- 数据资源：核实时未找到
- 其他官方资源：核实时未找到
- 备注：无需训练的推理方法；使用既有 T2V 权重。专属 HF 权重与数据仓库未找到。

## 2. Diffusion Forcing: Next-token Prediction Meets Full-Sequence Diffusion

- 作者：Chen, Boyuan；Monso, Diego Marti；Du, Yilun；Simchowitz, Max；Tedrake, Russ；Sitzmann, Vincent
- 单位：MIT CSAIL；Technical University of Munich。[论文全文](https://arxiv.org/html/2407.01392v4)
- 发表状态：NeurIPS 2024。[核实来源](https://proceedings.neurips.cc/paper_files/paper/2024/hash/2aee1c4159e48407d68fe16ae8e6e49e-Abstract-Conference.html)；核实于2026-09-27。
- 初次提交：2024-07-01；所读版本日期：2024-12-10。
- [论文](https://arxiv.org/abs/2407.01392) · [全文](https://arxiv.org/html/2407.01392v4) · [解读](index.html#paper-diffusion-forcing)
- 项目主页：[入口1](https://boyuan.space/diffusion-forcing/)
- GitHub：[入口1](https://github.com/buoyancy99/diffusion-forcing)
- Hugging Face模型：核实时未找到
- 数据资源：核实时未找到
- 其他官方资源：[入口1](https://drive.google.com/file/d/1xAOQxWcLzcFyD4zc0_rC9jGXe_uaHb7b/view?usp=sharing)
- 备注：官方仓库 main 为 v1.5 temporal-attention 实现；paper 分支保留原论文 RNN 实现，不应混用。 官方 Drive 包含 quick-start 权重与小型数据；未下载大文件。
- 方法阅读日期：2026-10-03

## 3. Live2Diff: Live Stream Translation via Uni-directional Attention in Video Diffusion Models

- 作者：Xing, Zhening；Fox, Gereon；Zeng, Yanhong；Pan, Xingang；Elgharib, Mohamed；Theobalt, Christian；Chen, Kai
- 单位：Shanghai AI Laboratory；Saarland Informatics Campus / Max Planck Institute for Informatics；NTU S-Lab。[论文全文](https://arxiv.org/html/2407.08701v1)
- 发表状态：预印本 / technical report；本轮未确认会议或期刊录用。[核实来源](https://arxiv.org/abs/2407.08701)；核实于2026-09-27。
- 初次提交：2024-07-11；所读版本日期：2024-07-11。
- [论文](https://arxiv.org/abs/2407.08701) · [全文](https://arxiv.org/html/2407.08701v1)
- 项目主页：[入口1](https://live2diff.github.io/)
- GitHub：[入口1](https://github.com/open-mmlab/Live2Diff)
- Hugging Face模型：[入口1](https://huggingface.co/Leoxing/Live2Diff)
- 数据资源：核实时未找到
- 其他官方资源：核实时未找到
- 备注：任务是在线 video-to-video translation。官方 Space：https://huggingface.co/spaces/Leoxing/Live2Diff。未把检索到的匿名 under-review PDF 当作录用证明。

## 4. From Slow Bidirectional to Fast Autoregressive Video Diffusion Models

- 作者：Yin, Tianwei；Zhang, Qiang；Zhang, Richard；Freeman, William T.；Durand, Fredo；Shechtman, Eli；Huang, Xun
- 单位：Massachusetts Institute of Technology；Adobe。[论文全文](https://arxiv.org/html/2412.07772v4)
- 发表状态：CVPR 2025。[核实来源](https://causvid.github.io/)；核实于2026-09-27。
- 初次提交：2024-12-10；所读版本日期：2025-09-23。
- [论文](https://arxiv.org/abs/2412.07772) · [全文](https://arxiv.org/html/2412.07772v4) · [解读](index.html#paper-causvid)
- 项目主页：[入口1](https://causvid.github.io/)
- GitHub：[入口1](https://github.com/tianweiy/CausVid)
- Hugging Face模型：[入口1](https://huggingface.co/tianweiy/CausVid)
- 数据资源：核实时未找到
- 其他官方资源：核实时未找到
- 备注：模型与推理代码入口已核实；未找到自建完整训练数据仓库。论文报告的吞吐只对其硬件/配置成立。
- 方法阅读日期：2026-10-03

## 5. MAGI-1: Autoregressive Video Generation at Scale

- 作者：ai, Sand.；Teng, Hansi；Jia, Hongyu；Sun, Lei；Li, Lingzhi；Li, Maolin；Tang, Mingqiu；Han, Shuai；Zhang, Tianning；Zhang, W. Q.；Luo, Weifeng；Kang, Xiaoyang；Sun, Yuchen；Cao, Yue；Huang, Yunpeng；Lin, Yutong；Fang, Yuxin；Tao, Zewei；Zhang, Zheng；Wang, Zhongshu；Liu, Zixun；Shi, Dai；Su, Guoli；Sun, Hanwen；Pan, Hong；Wang, Jie；Sheng, Jiexin；Cui, Min；Hu, Min；Yan, Ming；Yin, Shucheng；Zhang, Siran；Liu, Tingting；Yin, Xianping；Yang, Xiaoyu；Song, Xin；Hu, Xuan；Zhang, Yankai；Li, Yuqiao
- 单位：Sand AI。[论文全文](https://arxiv.org/html/2505.13211v1)
- 发表状态：预印本 / technical report；本轮未确认会议或期刊录用。[核实来源](https://arxiv.org/abs/2505.13211)；核实于2026-09-27。
- 初次提交：2025-05-19；所读版本日期：2025-05-19。
- [论文](https://arxiv.org/abs/2505.13211) · [全文](https://arxiv.org/html/2505.13211v1) · [解读](index.html#paper-magi1)
- 项目主页：核实时未找到
- GitHub：[入口1](https://github.com/SandAI-org/MAGI-1)
- Hugging Face模型：[入口1](https://huggingface.co/sand-ai/MAGI-1)
- 数据资源：核实时未找到
- 其他官方资源：核实时未找到
- 备注：技术报告另有官方 PDF：https://static.magi.world/static/files/MAGI_1.pdf。代码与模型区分 4.5B / 24B、base / distill / quant；仓库还含后续 MAGI-1.1。
- 方法阅读日期：2026-10-03

## 6. SkyReels-V2: Infinite-length Film Generative Model

- 作者：Chen, Guibin；Lin, Dixuan；Yang, Jiangping；Lin, Chunze；Zhu, Junchen；Fan, Mingyuan；Zhang, Hao；Chen, Sheng；Chen, Zheng；Ma, Chengcheng；Xiong, Weiming；Wang, Wei；Pang, Nuo；Kang, Kang；Xu, Zhiheng；Jin, Yuzhe；Liang, Yupeng；Song, Yubing；Zhao, Peng；Xu, Boyuan；Qiu, Di；Li, Debang；Fei, Zhengcong；Li, Yang；Zhou, Yahui
- 单位：Skywork AI。[论文全文](https://arxiv.org/html/2504.13074v3)
- 发表状态：预印本 / technical report；本轮未确认会议或期刊录用。[核实来源](https://arxiv.org/abs/2504.13074)；核实于2026-09-27。
- 初次提交：2025-04-17；所读版本日期：2025-04-21。
- [论文](https://arxiv.org/abs/2504.13074) · [全文](https://arxiv.org/html/2504.13074v3)
- 项目主页：核实时未找到
- GitHub：[入口1](https://github.com/SkyworkAI/SkyReels-V2)
- Hugging Face模型：[入口1](https://huggingface.co/Skywork/SkyReels-V2-DF-1.3B-540P)
- 数据资源：核实时未找到
- 其他官方资源：核实时未找到
- 备注：所列为 DF 版；官方另有 14B、540P / 720P 和 I2V / T2V 权重。不要把固定长度 I2V 版当作 DF 版。

## 7. Self Forcing: Bridging the Train-Test Gap in Autoregressive Video Diffusion

- 作者：Huang, Xun；Li, Zhengqi；He, Guande；Zhou, Mingyuan；Shechtman, Eli
- 单位：Adobe Research；The University of Texas at Austin。[论文全文](https://arxiv.org/html/2506.08009v2)
- 发表状态：NeurIPS 2025 Spotlight（官方仓库/arXiv 标注；论文集确认会议）。[核实来源](https://papers.neurips.cc/paper_files/paper/2025/hash/f4823f831af67a3ef15e41a85434422a-Abstract-Conference.html)；核实于2026-09-27。
- 初次提交：2025-06-09；所读版本日期：2025-11-10。
- [论文](https://arxiv.org/abs/2506.08009) · [全文](https://arxiv.org/html/2506.08009v2) · [解读](index.html#paper-self-forcing)
- 项目主页：[入口1](https://self-forcing.github.io/)
- GitHub：[入口1](https://github.com/guandeh17/Self-Forcing)
- Hugging Face模型：[入口1](https://huggingface.co/gdhe17/Self-Forcing)
- 数据资源：核实时未找到
- 其他官方资源：核实时未找到
- 备注：代码与权重可用，未找到专属完整训练数据仓库。
- 方法阅读日期：2026-10-03

## 8. StreamDiT: Real-Time Streaming Text-to-Video Generation

- 作者：Kodaira, Akio；Hou, Tingbo；Hou, Ji；Georgopoulos, Markos；Juefei-Xu, Felix；Tomizuka, Masayoshi；Zhao, Yue
- 单位：UC Berkeley；Meta。[论文全文](https://arxiv.org/html/2507.03745v4)
- 发表状态：CVPR 2026（作者项目页与 arXiv Comments 确认）。[核实来源](https://cumulo-autumn.github.io/StreamDiT/)；核实于2026-09-27。
- 初次提交：2025-07-04；所读版本日期：2026-03-27。
- [论文](https://arxiv.org/abs/2507.03745) · [全文](https://arxiv.org/html/2507.03745v4) · [解读](index.html#paper-streamdit)
- 项目主页：[入口1](https://cumulo-autumn.github.io/StreamDiT/)
- GitHub：核实时未找到
- Hugging Face模型：核实时未找到
- 数据资源：核实时未找到
- 其他官方资源：核实时未找到
- 备注：项目页可访问；本轮未找到模型实现或权重。https://github.com/streamdit/streamdit.github.io 为网页源码，不等同于模型代码。
- 方法阅读日期：2026-10-03

## 9. Matrix-game 2.0: An open-source real-time and streaming interactive world model

- 作者：He, Xianglong；Peng, Chunli；Liu, Zexiang；Wang, Boyang；Zhang, Yifan；Cui, Qi；Kang, Fei；Jiang, Biao；An, Mengyin；Ren, Yangyang；Xu, Baixin；Guo, Hao-Xiang；Gong, Kaixiong；Wu, Size；Li, Wei；Song, Xuchen；Liu, Yang；Li, Yangguang；Zhou, Yahui
- 单位：Skywork AI。[论文全文](https://arxiv.org/html/2508.13009v4)
- 发表状态：预印本 / technical report；本轮未确认会议或期刊录用。[核实来源](https://arxiv.org/abs/2508.13009)；核实于2026-09-27。
- 初次提交：2025-08-18；所读版本日期：2026-04-07。
- [论文](https://arxiv.org/abs/2508.13009) · [全文](https://arxiv.org/html/2508.13009v4)
- 项目主页：[入口1](https://matrix-game-v2.github.io/)
- GitHub：[入口1](https://github.com/SkyworkAI/Matrix-Game/tree/main/Matrix-Game-2)
- Hugging Face模型：[入口1](https://huggingface.co/Skywork/Matrix-Game-2.0)
- 数据资源：核实时未找到
- 其他官方资源：核实时未找到
- 备注：方法与数据生产系统 technical report；训练用数据量按实验部分理解，不能将数据引擎规模直接当作同一模型训练集大小。

## 10. LongLive: Real-time Interactive Long Video Generation

- 作者：Yang, Shuai；Huang, Wei；Chu, Ruihang；Xiao, Yicheng；Zhao, Yuyang；Wang, Xianbang；Li, Muyang；Xie, Enze；Chen, Yingcong；Lu, Yao；Han, Song；Chen, Yukang
- 单位：NVIDIA；MIT；HKUST (Guangzhou)；University of Hong Kong；Tsinghua University。[论文全文](https://arxiv.org/html/2509.22622v2)
- 发表状态：ICLR 2026（官方仓库 2026-01-27 公告）。[核实来源](https://github.com/NVlabs/LongLive)；核实于2026-09-27。
- 初次提交：2025-09-26；所读版本日期：2025-10-13。
- [论文](https://arxiv.org/abs/2509.22622) · [全文](https://arxiv.org/html/2509.22622v2) · [解读](index.html#paper-longlive)
- 项目主页：[入口1](https://nvlabs.github.io/LongLive/)
- GitHub：[入口1](https://github.com/NVlabs/LongLive/tree/v1.0)
- Hugging Face模型：[入口1](https://huggingface.co/Efficient-Large-Model/LongLive-1.3B)
- 数据资源：核实时未找到
- 其他官方资源：核实时未找到
- 备注：旧论文代码已移至 v1.0 分支；仓库 main 当前为 2.0。
- 方法阅读日期：2026-10-03

## 11. StreamDiffusionV2: A Streaming System for Dynamic and Interactive Video Generation

- 作者：Feng, Tianrui；Li, Zhi；Yang, Shuo；Xi, Haocheng；Li, Muyang；Li, Xiuyu；Zhang, Lvmin；Yang, Keting；Peng, Kelly；Han, Song；Agrawala, Maneesh；Keutzer, Kurt；Kodaira, Akio；Xu, Chenfeng
- 单位：UT Austin；UC Berkeley；Nunchaku AI；Stanford University；Independent Researcher；First Intelligence；MIT；Shizuku AI。[论文全文](https://arxiv.org/html/2511.07399v2)
- 发表状态：MLSys 2026；Best Paper Award（官方项目页声明）。[核实来源](https://streamdiffusionv2.github.io/)；核实于2026-09-27。
- 初次提交：2025-11-10；所读版本日期：2026-02-22。
- [论文](https://arxiv.org/abs/2511.07399) · [全文](https://arxiv.org/html/2511.07399v2)
- 项目主页：[入口1](https://streamdiffusionv2.github.io/)
- GitHub：[入口1](https://github.com/chenfengxu714/StreamDiffusionV2)
- Hugging Face模型：[入口1](https://huggingface.co/jerryfeng/StreamDiffusionV2)
- 数据资源：核实时未找到
- 其他官方资源：核实时未找到
- 备注：系统论文；training-free 指运行系统不需额外训练，不表示底层模型无需预训练 / 蒸馏。奖项来自作者项目页，本轮未另取大会奖项页。

## 12. Causal Forcing: Autoregressive Diffusion Distillation Done Right for High-Quality Real-Time Interactive Video Generation

- 作者：Zhu, Hongzhou；Zhao, Min；He, Guande；Su, Hang；Li, Chongxuan；Zhu, Jun
- 单位：Tsinghua University；ShengShu；UT Austin；Renmin University of China。[论文全文](https://arxiv.org/html/2602.02214v5)
- 发表状态：ICML 2026（官方仓库与 arXiv Comments 确认）。[核实来源](https://github.com/thu-ml/Causal-Forcing)；核实于2026-10-03。
- 初次提交：2026-02-02；所读版本日期：2026-06-01。
- [论文](https://arxiv.org/abs/2602.02214) · [全文](https://arxiv.org/html/2602.02214v5) · [解读](index.html#paper-causal-forcing)
- 项目主页：[入口1](https://thu-ml.github.io/CausalForcing.github.io/)
- GitHub：[入口1](https://github.com/thu-ml/Causal-Forcing)
- Hugging Face模型：[入口1](https://huggingface.co/zhuhz22/Causal-Forcing)
- 数据资源：[入口1](https://huggingface.co/zhuhz22/Causal-Forcing-data)
- 其他官方资源：核实时未找到
- 备注：原作与 ++ 共用仓库，须固定模型路径；原作录用状态不能自动移植给 ++。 2026-10-03补核官方数据文件，托管于HF model namespace。原文沿用已归档v5；只读核对代码commit da3ddf1a590f30c9edc568e11c2f77170995c31c，未运行模型。
- 版本复查：2026-10-15；复查arXiv版本日期；未将此操作视为重新核实原有会议录用状态。
- 方法阅读日期：2026-10-03

## 13. Streaming Autoregressive Video Generation via Diagonal Distillation

- 作者：Liu, Jinxiu；Liu, Xuanming；Mei, Kangfu；Wen, Yandong；Yang, Ming-Hsuan；Liu, Weiyang
- 单位：South China University of Technology；Westlake University；Johns Hopkins University；University of California, Merced；Chinese University of Hong Kong。[论文全文](https://arxiv.org/html/2603.09488v2)
- 发表状态：ICLR 2026（arXiv Comments 与项目页）。[核实来源](https://arxiv.org/abs/2603.09488)；核实于2026-09-27。
- 初次提交：2026-03-10；所读版本日期：2026-03-11。
- [论文](https://arxiv.org/abs/2603.09488) · [全文](https://arxiv.org/html/2603.09488v2)
- 项目主页：[入口1](https://spherelab.ai/diagdistill/)
- GitHub：[入口1](https://github.com/Sphere-AI-Lab/diagdistill)
- Hugging Face模型：核实时未找到
- 数据资源：核实时未找到
- 其他官方资源：核实时未找到
- 备注：31 FPS 实验使用 tiny VAE；与采用原版 VAE 的结果不构成同配置速度比较。 当前 README 提供训练与依赖模型下载指令；本轮未找到专属已训练 DiagDistill 权重下载入口。

## 14. Matrix-Game 3.0: Real-Time and Streaming Interactive World Model with Long-Horizon Memory

- 作者：Wang, Zile；Liu, Zexiang；Li, Jiaxing；Huang, Kaichen；Xu, Baixin；Kang, Fei；An, Mengyin；Wang, Peiyu；Jiang, Biao；Wei, Yichen；Xietian, Yidan；Pei, Jiangbo；Hu, Liang；Jiang, Boyi；Xue, Hua；Wang, Zidong；Sun, Haofeng；Li, Wei；Ouyang, Wanli；He, Xianglong；Liu, Yang；Li, Yangguang；Zhou, Yahui
- 单位：Skywork AI。[论文全文](https://arxiv.org/html/2604.08995v2)
- 发表状态：预印本 / technical report；本轮未确认会议或期刊录用。[核实来源](https://arxiv.org/abs/2604.08995)；核实于2026-09-27。
- 初次提交：2026-04-10；所读版本日期：2026-04-13。
- [论文](https://arxiv.org/abs/2604.08995) · [全文](https://arxiv.org/html/2604.08995v2)
- 项目主页：[入口1](https://matrix-game-v3.github.io/)
- GitHub：[入口1](https://github.com/SkyworkAI/Matrix-Game/tree/main/Matrix-Game-3)
- Hugging Face模型：[入口1](https://huggingface.co/Skywork/Matrix-Game-3.0)
- 数据资源：核实时未找到
- 其他官方资源：核实时未找到
- 备注：包含 MG-LightVAE。40 FPS 实验默认 8 GPU DiT + 1 GPU VAE 的异步配置，不是单卡成绩。

## 15. Causal Forcing++: Scalable Few-Step Autoregressive Diffusion Distillation for Real-Time Interactive Video Generation

- 作者：Zhao, Min；Zhu, Hongzhou；Zheng, Kaiwen；Zhou, Zihan；Yan, Bokai；Li, Xinyuan；Yang, Xiao；Li, Chongxuan；Zhu, Jun
- 单位：Tsinghua University；ShengShu；Renmin University of China。[论文全文](https://arxiv.org/html/2605.15141v4)
- 发表状态：预印本 / technical report；本轮未确认会议或期刊录用。[核实来源](https://arxiv.org/abs/2605.15141)；核实于2026-09-27。
- 初次提交：2026-05-14；所读版本日期：2026-10-04。
- [论文](https://arxiv.org/abs/2605.15141) · [全文](https://arxiv.org/html/2605.15141v4) · [解读](index.html#paper-causal-forcing-pp)
- 项目主页：[入口1](https://thu-ml.github.io/CausalForcing.github.io/)
- GitHub：[入口1](https://github.com/thu-ml/Causal-Forcing)
- Hugging Face模型：[入口1](https://huggingface.co/zhuhz22/Causal-Forcing)
- 数据资源：核实时未找到
- 其他官方资源：核实时未找到
- 备注：framewise 1 / 2-step 权重在 causal-forcing++ 子目录。world-model 扩展代码：https://github.com/shengshu-ai/minWM；模型：https://huggingface.co/MIN-Lab/minWM。
- 版本复查：2026-10-15；复查arXiv版本日期；未将此操作视为重新核实原有会议录用状态。
- 方法阅读日期：2026-10-15

## 16. LongLive-2.0: An NVFP4 Parallel Infrastructure for Long Video Generation

- 作者：Chen, Yukang；Wang, Luozhou；Huang, Wei；Yang, Shuai；Zhang, Bohan；Xiao, Yicheng；Chu, Ruihang；Mao, Weian；Hu, Qixin；Liu, Shaoteng；Zhao, Yuyang；Mao, Huizi；Chen, Ying-Cong；Xie, Enze；Qi, Xiaojuan；Han, Song
- 单位：NVIDIA（原文署名）。[论文全文](https://arxiv.org/html/2605.18739v2)
- 发表状态：预印本 / technical report；本轮未确认会议或期刊录用。[核实来源](https://arxiv.org/abs/2605.18739)；核实于2026-09-27。
- 初次提交：2026-05-18；所读版本日期：2026-05-19。
- [论文](https://arxiv.org/abs/2605.18739) · [全文](https://arxiv.org/html/2605.18739v2) · [解读](index.html#paper-longlive2)
- 项目主页：[入口1](https://nvlabs.github.io/LongLive/LongLive2/)
- GitHub：[入口1](https://github.com/NVlabs/LongLive)
- Hugging Face模型：[入口1](https://huggingface.co/Efficient-Large-Model/LongLive-2.0-5B)
- 数据资源：[入口1](https://huggingface.co/datasets/Efficient-Large-Model/LongLive2.0-Toy-Dataset)
- 其他官方资源：核实时未找到
- 备注：另有 LongLive-2.0-5B-NVFP4-S2 / S4 权重；文档：https://nvlabs.github.io/LongLive/LongLive2/docs/。网页由 JS 加载，普通文本抓取不足时依据仓库和原文。 数据链接为官方 toy dataset，不等于完整训练集。
- 版本复查：2026-10-15；复查arXiv版本日期；未将此操作视为重新核实原有会议录用状态。
- 方法阅读日期：2026-10-03

## 17. Causal-rCM: A Unified Teacher-Forcing and Self-Forcing Open Recipe for Autoregressive Diffusion Distillation in Streaming Video Generation and Interactive World Models

- 作者：Zheng, Kaiwen；He, Guande；Zhao, Min；Zhang, Jintao；Chen, Huayu；Chen, Jianfei；Lin, Chen-Hsuan；Liu, Ming-Yu；Zhu, Jun；Ma, Qianli
- 单位：Tsinghua University；NVIDIA；UT Austin。[论文全文](https://arxiv.org/html/2606.25473v1)
- 发表状态：2026 technical report；Causal-rCM 的独立会议录用未确认。[核实来源](https://arxiv.org/abs/2606.25473)；核实于2026-09-27。
- 初次提交：2026-06-24；所读版本日期：2026-06-24。
- [论文](https://arxiv.org/abs/2606.25473) · [全文](https://arxiv.org/html/2606.25473v1)
- 项目主页：核实时未找到
- GitHub：[入口1](https://github.com/NVlabs/rcm)
- Hugging Face模型：核实时未找到
- 数据资源：[入口1](https://huggingface.co/datasets/worstcoder/Wan_datasets)
- 其他官方资源：核实时未找到
- 备注：rCM 仓库的 ICLR 2026 标识不自动属于这篇 Causal-rCM。复现入口为 Causal_rCM.md；所列数据为仓库提供的合成训练数据，专属 causal checkpoint 下载入口见核验备注。 已读取官方 Causal_rCM.md，给出本地 checkpoint 命名与运行命令，但本轮未找到专属 causal 权重下载链接。
- 版本复查：2026-10-15；复查arXiv版本日期；未将此操作视为重新核实原有会议录用状态。

## 18. FlashDecoder: Real-Time Latent-to-Pixel Streaming Decoder with Transformers

- 作者：Kang, Minguk；Kwak, Suha
- 单位：Pika Labs；POSTECH。[论文全文](https://arxiv.org/html/2607.14898v1)
- 发表状态：CVPR 2026（arXiv Comments 声明；本轮 CVF 全文访问返回 403）。[核实来源](https://arxiv.org/abs/2607.14898)；核实于2026-09-27。
- 初次提交：2026-07-16；所读版本日期：2026-07-16。
- [论文](https://arxiv.org/abs/2607.14898) · [全文](https://arxiv.org/html/2607.14898v1)
- 项目主页：核实时未找到
- GitHub：[入口1](https://github.com/mingukkang/FlashDecoder)
- Hugging Face模型：核实时未找到
- 数据资源：核实时未找到
- 其他官方资源：核实时未找到
- 备注：官方仓库本轮仅见 README 与 PDF，未找到实现或权重；不应称为已开源可运行 decoder。

## 19. Stream Forcing: Constructing Unified Training Trajectory for Robust Streaming Video Generation

- 作者：Zhu, Yueting；Song, Yuehao；Zhang, Kaicheng；Tang, Bao；Chen, Shaoyu；Zhang, Qian；Liu, Wenyu；Wang, Xinggang
- 单位：Huazhong University of Science and Technology；Anyverse Dynamics；Horizon Robotics。[论文全文](https://arxiv.org/html/2608.10439v1)
- 发表状态：预印本 / technical report；本轮未确认会议或期刊录用。[核实来源](https://arxiv.org/abs/2608.10439)；核实于2026-09-27。
- 初次提交：2026-08-11；所读版本日期：2026-08-11。
- [论文](https://arxiv.org/abs/2608.10439) · [全文](https://arxiv.org/html/2608.10439v1)
- 项目主页：核实时未找到
- GitHub：核实时未找到
- Hugging Face模型：核实时未找到
- 数据资源：核实时未找到
- 其他官方资源：核实时未找到
- 备注：较新的训练噪声调度论文；本文选读方法与实验设定，不把 UCF-101 FVD 改进直接解释为开放域高分辨率实时质量提升。
- 版本复查：2026-10-15；复查arXiv版本日期；未将此操作视为重新核实原有会议录用状态。

## 20. Attention Is All You Need

- 作者：Ashish Vaswani；Noam Shazeer；Niki Parmar；Jakob Uszkoreit；Llion Jones；Aidan N. Gomez；Łukasz Kaiser；Illia Polosukhin
- 单位：Google Brain；Google Research；University of Toronto。[论文全文](https://arxiv.org/html/1706.03762v7)
- 发表状态：NIPS 2017；展示类型未核实。[核实来源](https://proceedings.neurips.cc/paper_files/paper/2017/hash/3f5ee243547dee91fbd053c1c4a845aa-Abstract.html)；核实于2026-10-02。
- 初次提交：未记录；所读版本日期：未记录。
- [论文](https://arxiv.org/abs/1706.03762) · [全文](https://arxiv.org/html/1706.03762v7)
- 项目主页：核实时未找到
- GitHub：[入口1](https://github.com/tensorflow/tensor2tensor)
- Hugging Face模型：核实时未找到
- 数据资源：核实时未找到
- 其他官方资源：核实时未找到
- 备注：原始Transformer基础；Tensor2Tensor为作者团队实现。不是视频生成论文。

## 21. Denoising Diffusion Probabilistic Models

- 作者：Jonathan Ho；Ajay Jain；Pieter Abbeel
- 单位：UC Berkeley。[论文全文](https://arxiv.org/html/2006.11239v2)
- 发表状态：NeurIPS 2020；展示类型未核实。[核实来源](https://proceedings.neurips.cc/paper/2020/hash/4c5bcfec8584af0d967f1ab10179ca4b-Abstract.html)；核实于2026-10-02。
- 初次提交：未记录；所读版本日期：未记录。
- [论文](https://arxiv.org/abs/2006.11239) · [全文](https://arxiv.org/html/2006.11239v2)
- 项目主页：[入口1](https://hojonathanho.github.io/diffusion/)
- GitHub：[入口1](https://github.com/hojonathanho/diffusion)
- Hugging Face模型：核实时未找到
- 数据资源：核实时未找到
- 其他官方资源：核实时未找到
- 备注：用于理解加噪训练与反向采样；代码README包含作者权重入口。

## 22. High-Resolution Image Synthesis with Latent Diffusion Models

- 作者：Robin Rombach；Andreas Blattmann；Dominik Lorenz；Patrick Esser；Björn Ommer
- 单位：LMU Munich；IWR, Heidelberg University；Runway。[论文全文](https://arxiv.org/html/2112.10752v2)
- 发表状态：CVPR 2022 Oral。[核实来源](https://ommer-lab.com/research/latent-diffusion-models/)；核实于2026-10-02。
- 初次提交：未记录；所读版本日期：未记录。
- [论文](https://arxiv.org/abs/2112.10752) · [全文](https://arxiv.org/html/2112.10752v2)
- 项目主页：[入口1](https://ommer-lab.com/research/latent-diffusion-models/)
- GitHub：[入口1](https://github.com/CompVis/latent-diffusion)
- Hugging Face模型：[入口1](https://huggingface.co/CompVis/ldm-text2im-large-256)
- 数据资源：核实时未找到
- 其他官方资源：核实时未找到
- 备注：是图像latent diffusion基础，不是视频VAE时间压缩的原始证据；视频尺寸例子在正文中单独标为教学假设。

## 23. Scalable Diffusion Models with Transformers

- 作者：William Peebles；Saining Xie
- 单位：UC Berkeley；New York University；Meta AI FAIR（论文注明实习期间工作）。[论文全文](https://arxiv.org/html/2212.09748v2)
- 发表状态：ICCV 2023 Oral。[核实来源](https://www.wpeebles.com/DiT)；核实于2026-10-02。
- 初次提交：未记录；所读版本日期：未记录。
- [论文](https://arxiv.org/abs/2212.09748) · [全文](https://arxiv.org/html/2212.09748v2)
- 项目主页：[入口1](https://www.wpeebles.com/DiT)
- GitHub：[入口1](https://github.com/facebookresearch/DiT)
- Hugging Face模型：[入口1](https://huggingface.co/facebook/DiT-XL-2-256)
- 数据资源：核实时未找到
- 其他官方资源：核实时未找到
- 备注：原始DiT为图像模型；视频模型进一步扩展时间维，不能把图像性能作为视频证据。

## 24. Flow Matching for Generative Modeling

- 作者：Yaron Lipman；Ricky T. Q. Chen；Heli Ben-Hamu；Maximilian Nickel；Matt Le
- 单位：Meta AI FAIR；Weizmann Institute of Science。[论文全文](https://arxiv.org/html/2210.02747v2)
- 发表状态：ICLR 2023；展示类型本次未进一步确认。[核实来源](https://openreview.net/pdf?id=PqvMRDCJT9t)；核实于2026-10-02。
- 初次提交：未记录；所读版本日期：未记录。
- [论文](https://arxiv.org/abs/2210.02747) · [全文](https://arxiv.org/html/2210.02747v2)
- 项目主页：核实时未找到
- GitHub：[入口1](https://github.com/facebookresearch/flow_matching)
- Hugging Face模型：核实时未找到
- 数据资源：核实时未找到
- 其他官方资源：[入口1](https://neurips.cc/virtual/2024/tutorial/99531)
- 备注：所列代码为作者机构后续维护的官方Flow Matching库，不将它标成2023论文逐项复现包；2024教程是后续官方教学资源。

## 25. Rolling Forcing: Autoregressive Long Video Diffusion in Real Time

- 作者：Liu, Kunhao；Hu, Wenbo；Xu, Jiale；Shan, Ying；Lu, Shijian
- 单位：Nanyang Technological University；ARC Lab, Tencent PCG。[论文全文](https://arxiv.org/html/2509.25161v1)
- 发表状态：ICLR 2026；特殊展示类型未核实。[核实来源](https://proceedings.iclr.cc/paper_files/paper/2026/hash/935151cc6cb5d8b6816133b75233775a-Abstract-Conference.html)；核实于2026-10-03。
- 初次提交：2025-09-29；所读版本日期：2025-09-29。
- [论文](https://arxiv.org/abs/2509.25161) · [全文](https://arxiv.org/html/2509.25161v1) · [解读](index.html#paper-rolling-forcing)
- 项目主页：[入口1](https://kunhao-liu.github.io/Rolling_Forcing_Webpage/)
- GitHub：[入口1](https://github.com/TencentARC/RollingForcing)
- Hugging Face模型：[入口1](https://huggingface.co/TencentARC/RollingForcing)
- 数据资源：核实时未找到
- 其他官方资源：[入口1](https://huggingface.co/spaces/TencentARC/RollingForcing)
- 备注：官方演示Space可找到，但本轮页面报告环境配置错误，不将其视为可运行验证。代码只读核对commit a1477d09e85dc759a6a6728f55f77f59342ce388；未运行模型。
- 版本复查：2026-10-15；复查arXiv版本日期；未将此操作视为重新核实原有会议录用状态。
- 方法阅读日期：2026-10-03

## 26. One-step Diffusion with Distribution Matching Distillation

- 作者：Yin, Tianwei；Gharbi, Michaël；Zhang, Richard；Shechtman, Eli；Durand, Fredo；Freeman, William T.；Park, Taesung
- 单位：Massachusetts Institute of Technology；Adobe Research。[论文全文](https://arxiv.org/html/2311.18828v4)
- 发表状态：CVPR 2024；特殊展示类型未核实。[核实来源](https://openaccess.thecvf.com/content/CVPR2024/html/Yin_One-step_Diffusion_with_Distribution_Matching_Distillation_CVPR_2024_paper.html)；核实于2026-10-03。
- 初次提交：2023-11-30；所读版本日期：2024-10-04。
- [论文](https://arxiv.org/abs/2311.18828) · [全文](https://arxiv.org/html/2311.18828v4) · [解读](index.html#paper-dmd)
- 项目主页：[入口1](https://tianweiy.github.io/dmd/)
- GitHub：核实时未找到
- Hugging Face模型：核实时未找到
- 数据资源：核实时未找到
- 其他官方资源：核实时未找到
- 备注：本轮未找到独立的原版官方代码、HF模型及专属数据仓库；DMD2是后续方法，不直接标成DMD原版实现。
- 方法阅读日期：2026-10-03

## 27. Improved Distribution Matching Distillation for Fast Image Synthesis

- 作者：Yin, Tianwei；Gharbi, Michaël；Park, Taesung；Zhang, Richard；Shechtman, Eli；Durand, Fredo；Freeman, William T.
- 单位：Massachusetts Institute of Technology；Adobe Research。[论文全文](https://arxiv.org/html/2405.14867v2)
- 发表状态：NeurIPS 2024 Oral（官方仓库明确标注Oral）。[核实来源](https://proceedings.neurips.cc/paper_files/paper/2024/hash/54dcf25318f9de5a7a01f0a4125c541e-Abstract-Conference.html)；核实于2026-10-03。
- 初次提交：2024-05-23；所读版本日期：2024-05-24。
- [论文](https://arxiv.org/abs/2405.14867) · [全文](https://arxiv.org/html/2405.14867v2) · [解读](index.html#paper-dmd2)
- 项目主页：[入口1](https://tianweiy.github.io/dmd2/)
- GitHub：[入口1](https://github.com/tianweiy/DMD2)
- Hugging Face模型：[入口1](https://huggingface.co/tianweiy/DMD2)
- 数据资源：核实时未找到
- 其他官方资源：核实时未找到
- 备注：Oral来源为官方仓库；论文集确认正式发表。SDXL一步版本附录仍使用小规模配对warm-up，不能将去掉主训练回归误读成全部配置完全不用配对数据。
- 方法阅读日期：2026-10-03

## 28. Self Gradient Forcing: Native Long Video Extrapolation

- 作者：Zhuang, Junhao；Zhang, Shiyi；Bian, Yuxuan；Li, Yaowei；Luo, Yawen；Liu, Yijun；Jin, Weiyang；Zhang, Songchun；He, Xianglong；Zhang, Xuying；Li, Haoran；Huang, Haoyang；Xue, Zeyue；Duan, Nan
- 单位：Joy Future Academy, JD。[论文全文](https://arxiv.org/html/2607.20368v2)
- 发表状态：预印本 / technical report；截至2026-10-15未确认会议或期刊录用。[核实来源](https://arxiv.org/abs/2607.20368)；核实于2026-10-15。
- 初次提交：2026-07-22；所读版本日期：2026-07-24。
- [论文](https://arxiv.org/abs/2607.20368) · [全文](https://arxiv.org/html/2607.20368v2) · [解读](index.html#paper-sgf)
- 项目主页：[入口1](https://zhuang2002.github.io/SelfGradientForcing)
- GitHub：[入口1](https://github.com/zhuang2002/Self_Gradient_Forcing)
- Hugging Face模型：[入口1](https://huggingface.co/JunhaoZhuang/Self_Gradient_Forcing)
- 数据资源：核实时未找到
- 其他官方资源：核实时未找到
- 备注：两遍replay恢复context参数梯度，记录的历史latent仍detach；7月旧文补读。
- 方法阅读日期：2026-10-15

## 29. SGF+: Decoupling Gradient Flows for Autoregressive Video Generation

- 作者：Su, Zihan；Zhuang, Junhao；Li, Yaowei；Lu, Siwen；Li, Haoran；Li, Lingen；Wu, Haoyu；Jin, Weiyang；Zhang, Songchun；Huang, Haoyang；Yuan, Chun；Xue, Zeyue；Duan, Nan
- 单位：Tsinghua University；Joy Future Academy, JD；The Chinese University of Hong Kong。[论文全文](https://arxiv.org/html/2610.10429v2)
- 发表状态：预印本 / technical report；截至2026-10-15未确认会议或期刊录用。[核实来源](https://arxiv.org/abs/2610.10429)；核实于2026-10-15。
- 初次提交：2026-10-07；所读版本日期：2026-10-08。
- [论文](https://arxiv.org/abs/2610.10429) · [全文](https://arxiv.org/html/2610.10429v2) · [解读](index.html#paper-sgf-plus)
- 项目主页：[入口1](https://zihan-su.github.io/self-gradient-forcing-plus)
- GitHub：[入口1](https://github.com/Zihan-Su/Self_Gradient_Forcing_Plus)
- Hugging Face模型：[入口1](https://huggingface.co/ZihanSu/Self_Gradient_Forcing_Plus)
- 数据资源：核实时未找到
- 其他官方资源：核实时未找到
- 备注：主文按Wan实验精读；24小时是定性长时结果，量化评测另见60/240秒设置。
- 方法阅读日期：2026-10-15

## 30. Connected Self Forcing: Beyond Local Learning in Video Autoregression

- 作者：Zhang, Dongbin；Zheng, Chaoda；Chen, Kangjie；Li, Xiangyu；Chen, Shijia；Deng, Jinhao；Zhang, Yuqi；Jiang, Guangfeng；Lin, Hongbin；Wai, Choo Sin；Wang, Minqi；Wang, Puyi；Zhang, Jingye；Zhang, Yu；Liu, Xianming；Wang, Boyang
- 单位：XPeng；The Chinese University of Hong Kong；Tsinghua University。[论文全文](https://arxiv.org/html/2610.12156v1)
- 发表状态：预印本 / technical report；截至2026-10-15未确认会议或期刊录用。[核实来源](https://arxiv.org/abs/2610.12156)；核实于2026-10-15。
- 初次提交：2026-10-08；所读版本日期：2026-10-08。
- [论文](https://arxiv.org/abs/2610.12156) · [全文](https://arxiv.org/html/2610.12156v1) · [解读](index.html#paper-connected-sf)
- 项目主页：[入口1](https://eastbeanzhang.github.io/CSF/)
- GitHub：[入口1](https://github.com/EastbeanZhang/Connected-Self-Forcing)
- Hugging Face模型：核实时未找到
- 数据资源：核实时未找到
- 其他官方资源：核实时未找到
- 备注：shortcut replay恢复选定跨块梯度，不能视为完整多步BPTT；官方代码入口可访问，专属HF权重未找到。
- 方法阅读日期：2026-10-15

## 31. In-Distribution Forcing for Long Video Generation at Test Time

- 作者：Shin, Jeongwoo；Choi, Youngyoon；Jo, Sangwoo；Kim, Hyunmog；Choi, Sungjoon；Lee, Joonseok；Choi, Jaewoong；Choi, Jaemoo
- 单位：Seoul National University；Korea University；Sungkyunkwan University；Georgia Institute of Technology。[论文全文](https://arxiv.org/html/2610.03120v2)
- 发表状态：预印本 / technical report；截至2026-10-15未确认会议或期刊录用。[核实来源](https://arxiv.org/abs/2610.03120)；核实于2026-10-15。
- 初次提交：2026-10-02；所读版本日期：2026-10-07。
- [论文](https://arxiv.org/abs/2610.03120) · [全文](https://arxiv.org/html/2610.03120v2) · [解读](index.html#paper-id-forcing)
- 项目主页：[入口1](https://in-distribution-forcing.github.io/)
- GitHub：[入口1](https://github.com/In-Distribution-Forcing/ID-Forcing)
- Hugging Face模型：核实时未找到
- 数据资源：核实时未找到
- 其他官方资源：核实时未找到
- 备注：training-free推理策略；官方仓库引用原Self Forcing/LongLive权重，不把这些基座计作本方法新权重。
- 方法阅读日期：2026-10-15

## 32. Adversarial Gradient Forcing for Robust Few-Step Autoregressive Video Generation

- 作者：Xia, Chenxi；Xu, Yixuan；Liu, Shan；Wang, Jiapeng；Li, Maohua；Tang, Hanlin；Liu, Kan；Lan, Tao；Lu, Weiyi；Liu, Xinggao
- 单位：Zhejiang University；Alibaba Group；Nanjing University。[论文全文](https://arxiv.org/html/2610.14553v1)
- 发表状态：预印本 / technical report；截至2026-10-15未确认会议或期刊录用。[核实来源](https://arxiv.org/abs/2610.14553)；核实于2026-10-15。
- 初次提交：2026-10-10；所读版本日期：2026-10-10。
- [论文](https://arxiv.org/abs/2610.14553) · [全文](https://arxiv.org/html/2610.14553v1) · [解读](index.html#paper-agf)
- 项目主页：[入口1](https://wuli-art.github.io/Adversarial-Gradient-Forcing/)
- GitHub：[入口1](https://github.com/wuli-art/Adversarial-Gradient-Forcing)
- Hugging Face模型：[入口1](https://huggingface.co/Wuli-art/Adversarial-Gradient-Forcing)
- 数据资源：核实时未找到
- 其他官方资源：核实时未找到
- 备注：5秒训练、60/240秒评测；Q5与VBench Total不同。
- 方法阅读日期：2026-10-15

## 33. FrameFold: Response-Guided KV Cache Consolidation for Autoregressive Long Video Generation

- 作者：Liu, Muyu；Liu, Mingming；Gu, Hong；Zhang, Yuyao；Lu, Qin
- 单位：ShanghaiTech University；vivo BlueImage Lab。[论文全文](https://arxiv.org/html/2610.14568v1)
- 发表状态：预印本 / technical report；截至2026-10-15未确认会议或期刊录用。[核实来源](https://arxiv.org/abs/2610.14568)；核实于2026-10-15。
- 初次提交：2026-10-10；所读版本日期：2026-10-10。
- [论文](https://arxiv.org/abs/2610.14568) · [全文](https://arxiv.org/html/2610.14568v1) · [解读](index.html#paper-framefold)
- 项目主页：[入口1](https://vivocameraresearch.github.io/FrameFold-Webpage/dist)
- GitHub：核实时未找到
- Hugging Face模型：核实时未找到
- 数据资源：核实时未找到
- 其他官方资源：核实时未找到
- 备注：无训练的KV合并；项目页未提供代码/权重链接，检索未找到专属仓库。
- 方法阅读日期：2026-10-15

## 34. MosaiChunk: Compositing Spatio-Temporal Memory for Autoregressive Video Generation

- 作者：Zhang, Yiwen；Xi, Haocheng；Liu, Michael Tian-Yue；Efros, Alexei A.；Averbuch-Elor, Hadar；Wang, Qianqian；Feng, Haiwen
- 单位：Cornell University；University of California, Berkeley；Harvard University；Impossible, Inc.。[论文全文](https://arxiv.org/html/2610.02153v1)
- 发表状态：预印本 / technical report；截至2026-10-15未确认会议或期刊录用。[核实来源](https://arxiv.org/abs/2610.02153)；核实于2026-10-15。
- 初次提交：2026-10-01；所读版本日期：2026-10-01。
- [论文](https://arxiv.org/abs/2610.02153) · [全文](https://arxiv.org/html/2610.02153v1) · [解读](index.html#paper-mosaichunk)
- 项目主页：[入口1](https://mosaichunk.github.io/)
- GitHub：[入口1](https://github.com/mosaichunk/MosaiChunk)
- Hugging Face模型：[入口1](https://huggingface.co/mosaichunk/MosaiChunk)
- 数据资源：[入口1](https://huggingface.co/datasets/mosaichunk/RememBench)
- 其他官方资源：核实时未找到
- 备注：CPU section bank与固定active KV预算不同；RememBench为作者发布的重访数据。
- 方法阅读日期：2026-10-15

## 35. TempoKV: Predictive KV Cache Quantization for Autoregressive Video Generation

- 作者：Hu, Jiahui；Mo, Weile；Cai, Peiliang；Liu, Jiacheng；Ren, Jinkui；Zhang, Xiantao；Tu, Xiaobing；Zhang, Linfeng
- 单位：Shanghai Jiao Tong University；South China University of Technology；Alibaba Group。[论文全文](https://arxiv.org/html/2610.15324v1)
- 发表状态：预印本 / technical report；截至2026-10-15未确认会议或期刊录用。[核实来源](https://arxiv.org/abs/2610.15324)；核实于2026-10-15。
- 初次提交：2026-10-11；所读版本日期：2026-10-11。
- [论文](https://arxiv.org/abs/2610.15324) · [全文](https://arxiv.org/html/2610.15324v1) · [解读](index.html#paper-tempokv)
- 项目主页：核实时未找到
- GitHub：核实时未找到
- Hugging Face模型：核实时未找到
- 数据资源：核实时未找到
- 其他官方资源：核实时未找到
- 备注：论文声明代码将发布；核实时未找到GitHub入口。需要离线预测器校准，不更新生成主干。
- 方法阅读日期：2026-10-15

## 36. Prospective Forcing: Learning to Look Ahead for Autoregressive Long Video Diffusion

- 作者：Shen, Yifan；Xia, Yewei；Luo, Gongxu；Zhu, Peiyuan；Sun, Boyang；Chen, Zhenhao；Liu, Guangyi；Chen, Guangyi；Zhang, Kun
- 单位：Mohamed bin Zayed University of Artificial Intelligence；Carnegie Mellon University；Institute of Foundation Models。[论文全文](https://arxiv.org/html/2610.14654v1)
- 发表状态：预印本 / technical report；截至2026-10-15未确认会议或期刊录用。[核实来源](https://arxiv.org/abs/2610.14654)；核实于2026-10-15。
- 初次提交：2026-10-10；所读版本日期：2026-10-10。
- [论文](https://arxiv.org/abs/2610.14654) · [全文](https://arxiv.org/html/2610.14654v1) · [解读](index.html#paper-prospective-forcing)
- 项目主页：核实时未找到
- GitHub：核实时未找到
- Hugging Face模型：核实时未找到
- 数据资源：核实时未找到
- 其他官方资源：核实时未找到
- 备注：原文与公开检索未找到专属项目、代码、HF或数据仓库；文中DeepForcing链接属于参考文献。
- 方法阅读日期：2026-10-15

## 37. Conditional Residual Prediction: Improving Autoregressive Video Diffusion without a Bidirectional Teacher

- 作者：Zheng, Bowen；Liu, Zhiguang；Ou, Jiarong；Chen, Rui；Hu, Tianyang
- 单位：The Chinese University of Hong Kong, Shenzhen；Tencent Hunyuan。[论文全文](https://arxiv.org/html/2610.11479v1)
- 发表状态：预印本 / technical report；截至2026-10-15未确认会议或期刊录用。[核实来源](https://arxiv.org/abs/2610.11479)；核实于2026-10-15。
- 初次提交：2026-10-08；所读版本日期：2026-10-08。
- [论文](https://arxiv.org/abs/2610.11479) · [全文](https://arxiv.org/html/2610.11479v1) · [解读](index.html#paper-crp)
- 项目主页：核实时未找到
- GitHub：核实时未找到
- Hugging Face模型：核实时未找到
- 数据资源：核实时未找到
- 其他官方资源：核实时未找到
- 备注：Optica使用50步；本轮未找到专属代码、模型或内部训练数据仓库。
- 方法阅读日期：2026-10-15

## 38. DuoMatching: Joint-Marginal Distribution Matching for Few-Step Video Generation

- 作者：Zhan, Jiahao；Wang, Yan；Ma, Yongrui；Xing, Qunliang；Yao, Ruchang；Liu, Runtao；Zhao, Shijie；Xue, Tianfan
- 单位：MMLab, The Chinese University of Hong Kong；ByteDance；Hong Kong University of Science and Technology；CPII under InnoHK。[论文全文](https://arxiv.org/html/2610.03543v1)
- 发表状态：预印本 / technical report；截至2026-10-15未确认会议或期刊录用。[核实来源](https://arxiv.org/abs/2610.03543)；核实于2026-10-15。
- 初次提交：2026-10-02；所读版本日期：2026-10-02。
- [论文](https://arxiv.org/abs/2610.03543) · [全文](https://arxiv.org/html/2610.03543v1) · [解读](index.html#paper-duomatching)
- 项目主页：[入口1](https://johnzhan2023.github.io/DuoMatching/)
- GitHub：[入口1](https://github.com/JohnZhan2023/DuoMatching)
- Hugging Face模型：[入口1](https://huggingface.co/JohnZhan/DuoMatching)
- 数据资源：核实时未找到
- 其他官方资源：核实时未找到
- 备注：官方代码和模型可访问；LatentBridge训练数据来自OpenVid子集，未找到专属整理数据仓库。
- 方法阅读日期：2026-10-15

## 39. Frequency-Step Cache: Separating Synchronization and Repair for Efficient Autoregressive Video Diffusion

- 作者：Xu, Kerry；Misra, Param；Stenglein, Zachary；Karunamurthy, Athri；Ye, Fanjiang；Wang, Yuke
- 单位：Rice University。[论文全文](https://arxiv.org/html/2610.15922v1)
- 发表状态：预印本 / technical report；截至2026-10-15未确认会议或期刊录用。[核实来源](https://arxiv.org/abs/2610.15922)；核实于2026-10-15。
- 初次提交：2026-10-11；所读版本日期：2026-10-11。
- [论文](https://arxiv.org/abs/2610.15922) · [全文](https://arxiv.org/html/2610.15922v1) · [解读](index.html#paper-frequency-step-cache)
- 项目主页：核实时未找到
- GitHub：核实时未找到
- Hugging Face模型：核实时未找到
- 数据资源：核实时未找到
- 其他官方资源：核实时未找到
- 备注：原文及公开检索未找到专属代码/权重/数据入口；不是KV历史检索方法。
- 方法阅读日期：2026-10-15

## 40. Real-Time Joint Audio-Video Generation by Parallel Adapter Composition

- 作者：Li, Jingyu；Xiang, Xiaoxiao；Guo, Yiwen
- 单位：LIGHTSPEED；Independent Researcher。[论文全文](https://arxiv.org/html/2610.10343v2)
- 发表状态：预印本；项目页注明ICLR 2027 under review，尚非录用。[核实来源](https://pac-demo-2027.github.io/demo/)；核实于2026-10-15。
- 初次提交：2026-10-07；所读版本日期：2026-10-08。
- [论文](https://arxiv.org/abs/2610.10343) · [全文](https://arxiv.org/html/2610.10343v2) · [解读](index.html#paper-parallel-av)
- 项目主页：[入口1](https://pac-demo-2027.github.io/demo/)
- GitHub：核实时未找到
- Hugging Face模型：核实时未找到
- 数据资源：核实时未找到
- 其他官方资源：核实时未找到
- 备注：项目注明ICLR 2027 under review，不等于录用；项目说明代码将发布。lightx2v Turbo是使用的外部adapter，不是本工作新发布权重。
- 方法阅读日期：2026-10-15

## 41. EditStream: A Unified Autoregressive Framework for Interactive Video Generation and Editing

- 作者：Zhou, Yuqian；Zhou, Zhenghong；Wu, Zongze；Smith, Cameron；Zhang, Richard；Luo, Jiebo；Shechtman, Eli；Lin, Zhe
- 单位：Adobe Research；University of Rochester。[论文全文](https://arxiv.org/html/2608.21424v1)
- 发表状态：预印本 / technical report；截至2026-10-15未确认会议或期刊录用。[核实来源](https://arxiv.org/abs/2608.21424)；核实于2026-10-15。
- 初次提交：2026-08-16；所读版本日期：2026-08-16。
- [论文](https://arxiv.org/abs/2608.21424) · [全文](https://arxiv.org/html/2608.21424v1) · [解读](index.html#paper-editstream)
- 项目主页：[入口1](https://real-time-video-research.github.io/editstream/)
- GitHub：核实时未找到
- Hugging Face模型：核实时未找到
- 数据资源：核实时未找到
- 其他官方资源：核实时未找到
- 备注：8月遗漏补充；官方项目可访问，本轮未找到专属公开代码、权重及数据仓库。
- 方法阅读日期：2026-10-15

## 42. Vidu S2: Real-Time Interactive, Editable, and Spatial Video Generation

- 作者：Zhang, Jintao；Jiang, Kai；Chen, Jintao；Wang, Xu；Liu, Deyuan；Li, Jungang；Chen, Dechuang；Lin, Ming；Zhou, Jingjiang；Jin, Haopeng；Jia, Qi；Wang, Xiaohang；Wang, Yaole；Zhang, Zhanqiang；Li, Ran；Huang, Zhengkun；Xiong, Shuyue；Wang, Yuji；Dai, Zikun；He, Hui；Luo, Yang；Ning, Mang；Feng, Weiqi；Ye, Chengyang；Lin, Xinyue；Zhao, Min；Zhu, Hongzhou；Tan, Hengkai；Wang, Zeyuan；Xiang, Chendong；Zheng, Kaiwen；Deng, Zhijie；Bao, Fan；Chen, Jianfei；Zhu, Jun
- 单位：Tsinghua University；Shengshu Technology。[论文全文](https://arxiv.org/html/2609.11638v1)
- 发表状态：预印本 / technical report；截至2026-10-15未确认会议或期刊录用。[核实来源](https://arxiv.org/abs/2609.11638)；核实于2026-10-15。
- 初次提交：2026-09-10；所读版本日期：2026-09-10。
- [论文](https://arxiv.org/abs/2609.11638) · [全文](https://arxiv.org/html/2609.11638v1) · [解读](index.html#paper-vidu-s2)
- 项目主页：[入口1](https://vidu.com/vidu-stream)
- GitHub：核实时未找到
- Hugging Face模型：核实时未找到
- 数据资源：核实时未找到
- 其他官方资源：核实时未找到
- 备注：9月technical report补充；官方服务入口不等于代码与权重公开。
- 方法阅读日期：2026-10-15

## 43. Zing-0.5: Toward Playable Worlds with Real-Time Joint Action and Text Control

- 作者：Chen, Mingyang；Chen, Shengdong；Fu, Xiaoxiao；Gong, Bosheng；Guo, Haoyuan；Li, Bowen；Li, Jiawen；Li, Kejun；Li, Tianpeng；Liu, Yin；Sun, Haoze；Tian, Zeyang；Wang, Meng；Wu, Xinmiao；Yan, Jiangqiao；Zhao, Zining
- 单位：Zing Team, SeedLeap.ai。[论文全文](https://arxiv.org/html/2609.17909v1)
- 发表状态：预印本 / technical report；截至2026-10-15未确认会议或期刊录用。[核实来源](https://arxiv.org/abs/2609.17909)；核实于2026-10-15。
- 初次提交：2026-09-15；所读版本日期：2026-09-15。
- [论文](https://arxiv.org/abs/2609.17909) · [全文](https://arxiv.org/html/2609.17909v1) · [解读](index.html#paper-zing)
- 项目主页：[入口1](https://zing.loopit.me/)
- GitHub：[入口1](https://github.com/seedleap/zing-world-model) · [入口2](https://github.com/seedleap/Zing-SGLang)
- Hugging Face模型：[入口1](https://huggingface.co/seedleap/zing-0.5)
- 数据资源：核实时未找到
- 其他官方资源：核实时未找到
- 备注：论文首页署名Zing Team，个人作者按arXiv元数据完整列出；9月technical report补充。
- 方法阅读日期：2026-10-15
