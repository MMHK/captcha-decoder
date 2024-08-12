# Captcha Decoder

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Docker Pulls](https://img.shields.io/docker/pulls/mmhk/captcha-decoder)](https://hub.docker.com/r/mmhk/captcha-decoder)

Captcha Decoder 是一个基于 OpenAI 和 Azure OpenAI 的验证码识别服务。

## 功能

- 使用 OpenAI 或 Azure OpenAI API 进行验证码识别
- 提供 RESTful API 接口
- 集成 Swagger 和 Swagger UI 以便于 API 文档查看

## 环境变量

在使用本项目之前，请确保在 `.env` 文件中配置以下环境变量：
以下是需要在 `.env` 文件中配置的环境变量：

### OpenAI API 配置

- `OPENAI_API_KEY`: 你的 OpenAI API 密钥，用于访问 OpenAI 的服务。

### Azure OpenAI API 配置

- `AZURE_OPENAI_API_KEY`: 你的 Azure OpenAI API 密钥，用于访问 Azure OpenAI 的服务。
- `AZURE_OPENAI_DEPLOYMENT_NAME`: 你的 Azure OpenAI 部署名称。
- `AZURE_OPENAI_API_INSTANCE_NAME`: 你的 Azure OpenAI 实例名称。
- `AZURE_OPENAI_API_VERSION`: 你的 Azure OpenAI API 版本。

### 服务器配置

- `PORT`: 服务器监听的端口号，默认为 3000。

#### docker-compose

```yaml
services:
  captcha-decoder:
    image: mmhk/captcha-decoder:latest
    environment:
      - OPENAI_API_KEY=YOUR_OPENAI_API_KEY
      - AZURE_OPENAI_API_KEY=YOUR_AZURE_OPENAI_API_KEY
      - AZURE_OPENAI_DEPLOYMENT_NAME=YOUR_AZURE_OPENAI_DEPLOYMENT_NAME
      - AZURE_OPENAI_API_INSTANCE_NAME=YOUR_AZURE_OPENAI_API_INSTANCE_NAME
      - AZURE_OPENAI_API_VERSION=YOUR_AZURE_OPENAI_API_VERSION
      - PORT=3000
    ports:
      - 3000:3000
```




