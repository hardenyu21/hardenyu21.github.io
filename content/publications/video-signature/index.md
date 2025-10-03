---
title: 'Video Signature: In-generation Watermarking for Latent Video Diffusion Models'
authors:
  - admin
  - Junhao Chen
  - Shuliang Liu
  - Hanqian Li
  - Qi Zheng
  - Yi R. Fung
  - Xuming Hu
author_notes:
  - 'Equal contribution'
  - 'Equal contribution'
  - ''
  - ''
  - ''
  - ''
  - ''
date: '2025-05-31T00:00:00Z'
# doi: '10.48550/arXiv.2509.21856'
publishDate: '2025-05-31T00:00:00Z'
publication_types: ['paper-conference']
publication: In *arXiv preprint*
publication_short: In *arXiv*
abstract: The rapid development of Artificial Intelligence Generated Content (AIGC) has led to significant progress in video generation but also raises serious concerns about intellectual property protection and reliable content tracing. Watermarking is a widely adopted solution to this issue, but existing methods for video generation mainly follow a post-generation paradigm, which introduces additional computational overhead and often fails to effectively balance the trade-off between video quality and watermark extraction. To address these issues, we propose Video Signature (VIDSIG), an in-generation watermarking method for latent video diffusion models, which enables implicit and adaptive watermark integration during generation. Specifically, we achieve this by partially fine-tuning the latent decoder, where Perturbation-Aware Suppression (PAS) pre-identifies and freezes perceptually sensitive layers to preserve visual quality. Beyond spatial fidelity, we further enhance temporal consistency by introducing a lightweight Temporal Alignment module that guides the decoder to generate coherent frame sequences during fine-tuning. Experimental results show that VIDSIG achieves the best overall performance in watermark extraction, visual quality, and generation efficiency. It also demonstrates strong robustness against both spatial and temporal tampering, highlighting its practicality in real-world scenarios. Our code is available at https://github.com/hardenyu21/Video-Signature.
summary: An in-generation watermarking method for latent video diffusion models, which enables implicit and adaptive watermark integration during generation.
tags:
  - Watermaking
  - Latent Video Diffusion Models
featured: true
links:
  - name: ArXiv
    url: https://arxiv.org/abs/2506.00652
url_pdf: 'https://arxiv.org/pdf/2506.00652.pdf'
url_code: 'https://github.com/hardenyu21/Video-Signature'
# url_dataset: 'https://github.com/hardenyu21/KnowMT-Bench/tree/main/data'
url_poster: ''
url_project: ''
url_slides: ''
url_source: ''
url_video: ''
image:
  caption: 'Video Signature: In-generation Watermarking for Latent Video Diffusion Models'
  focal_point: ''
  preview_only: false
projects: []
slides: ""
---

## Abstract

we propose **Video Signature (VIDSIG)**, an in-generation watermarking method for latent video diffusion models, which enables implicit and adaptive watermark integration during generation.
