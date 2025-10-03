---
title: 'Videomark: A distortion-free robust watermarking framework for video diffusion models'
authors:
  - Xuming Hu
  - Hanqian Li
  - Jungang Li
  - admin
  - Aiwei Liu
author_notes:
  - 'Equal contribution'
  - 'Equal contribution'
  - ''
  - ''
  - ''
date: '2025-04-23T00:00:00Z'
# doi: '10.48550/arXiv.2509.21856'
publishDate: '2025-04-23T00:00:00Z'
publication_types: ['paper-conference']
publication: In *arXiv preprint*
publication_short: In *arXiv*
abstract: This work introduces VideoMark, a distortion-free robust watermarking framework for video diffusion models. As diffusion models excel in generating realistic videos, reliable content attribution is increasingly critical. However, existing video watermarking methods often introduce distortion by altering the initial distribution of diffusion variables and are vulnerable to temporal attacks, such as frame deletion, due to variable video lengths. VideoMark addresses these challenges by employing a pure pseudorandom initialization to embed watermarks, avoiding distortion while ensuring uniform noise distribution in the latent space to preserve generation quality. To enhance robustness, we adopt a frame-wise watermarking strategy with pseudorandom error correction (PRC) codes, using a fixed watermark sequence with randomly selected starting indices for each video. For watermark extraction, we propose a Temporal Matching Module (TMM) that leverages edit distance to align decoded messages with the original watermark sequence, ensuring resilience against temporal attacks. Experimental results show that VideoMark achieves higher decoding accuracy than existing methods while maintaining video quality comparable to watermark-free generation. The watermark remains imperceptible to attackers without the secret key, offering superior invisibility compared to other frameworks. VideoMark provides a practical, training-free solution for content attribution in diffusion-based video generation. Code and data are available at https://github.com/KYRIE-LI11/VideoMark.
summary: A distortion-free robust watermarking framework for video diffusion models.
tags:
  - Watermaking
  - Latent Video Diffusion Models
featured: true
links:
  - name: ArXiv
    url: https://arxiv.org/abs/2504.16359
url_pdf: 'https://arxiv.org/pdf/2504.16359.pdf'
url_code: 'https://github.com/KYRIE-LI11/VideoMark'
# url_dataset: 'https://github.com/hardenyu21/KnowMT-Bench/tree/main/data'
url_poster: ''
url_project: ''
url_slides: ''
url_source: ''
url_video: ''
image:
  caption: 'Videomark: A distortion-free robust watermarking framework for video diffusion models'
  focal_point: ''
  preview_only: false
projects: []
slides: ""
---

## Abstract

we propose **VideoMark**, a distortion-free robust watermarking framework for video diffusion models. 
