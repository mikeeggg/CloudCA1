# Cloud Computing CA1 – Cloud Run CI/CD Application

## Overview

This repository contains a **cloud-native Node.js web application** developed for **Cloud Computing CA1**.  
The application is fully containerised and deployed on **Google Cloud Platform (GCP)** using an automated **CI/CD pipeline**.

The project demonstrates practical use of **serverless computing**, **managed NoSQL storage**, **containerisation**, and **continuous deployment** in line with the CA1 specification.

---

## Core Requirements Coverage

### Google Cloud Services Used

- **Cloud Run**  
  Hosts the containerised Node.js application and provides automatic scaling based on incoming traffic.

- **Firestore (NoSQL Database)**  
  Stores submitted form data from the application backend in a fully managed, schema-less database.

- **Cloud Build**  
  Implements continuous integration and deployment triggered by GitHub commits.

- **Artifact Registry**  
  Stores versioned Docker images generated during the CI/CD pipeline.

- **IAM (Identity and Access Management)**  
  Manages secure service-to-service authentication using service accounts and role-based access control.

---

## Automated Deployment Pipeline

The application is deployed automatically using **Cloud Build triggers** connected to the GitHub repository.

### Deployment Flow

1. A commit is pushed to the `main` branch  
2. Cloud Build executes `cloudbuild.yaml`  
3. Docker image is built  
4. Image is pushed to Artifact Registry  
5. Cloud Run service is deployed with the new image  

This approach ensures:
- No manual deployments
- Fully repeatable builds
- Clear execution history via Cloud Build

---

## Infrastructure Configuration

- **Dockerfile**  
  Packages the application using a lightweight Node.js base image.

- **cloudbuild.yaml**  
  Defines build, push, and deployment steps with region-based configuration and Cloud Logging enabled.

- **Cloud Run**  
  Manages scaling, networking, and service availability declaratively.

- **Firestore (Native Mode)**  
  Provides persistent storage for application data without requiring schema management.

---

## Application Endpoints

| Method | Path      | Description                                      |
|------|-----------|--------------------------------------------------|
| GET  | `/`       | Serves the HTML form user interface               |
| POST | `/submit` | Accepts form data and writes it to Firestore     |

---

## Local Development

```bash
git clone https://github.com/mikeeggg/CloudCA1.git
cd CloudCA1
npm install
npm start
```
---

The application runs locally at:
http://localhost:8080

## One-Time GCP Provisioning 

Artifact Registery 

```bash
gcloud artifacts repositories create cloud-run \
  --location=europe-west1 \
  --repository-format=docker
```
Firestore

Firestore was created in Native Mode and used as the application database.
A collection is created automatically when the application writes data.

## IAM Permissions 

The cloud Build service account was granted the following roles:
```bash
roles/run.admin
roles/artifactregistry.writer
roles/iam.serviceAccountUser
```
##Cloud Run Service Account
roles/datastore.user
These permissions allow Cloud Run to securely read and write data to Firestore without exposing credentials.

## Security Considerations

No API keys or credentials are stored in source code

Authentication is handled via IAM service accounts

Firestore access is restricted using role-based permissions

No credentials are baked into Docker images

The principle of least privilege is applied

## Cost Analysis

This project uses serverless and managed Google Cloud services, resulting in minimal operating costs.

| Service           | Pricing Model                  | Estimated Cost  |
| ----------------- | ------------------------------ | --------------- |
| Cloud Run         | Pay per request / compute time | $0 – $1 / month |
| Firestore         | Free tier usage                | $0              |
| Artifact Registry | Free tier storage              | $0              |

The application remains within free tiers for standard coursework usage.

## Deployment Evidence

Cloud Build execution completed successfully
<img width="2048" height="1224" alt="3755d329-ff00-4462-8e66-e0f63dd2536a" src="https://github.com/user-attachments/assets/70e9fda5-d753-4e22-beef-9de40a6d0a9c" />


Docker image stored in Artifact Registry
<img width="2048" height="1214" alt="3d5529b1-b1cb-459d-b234-ca33c4ebbdb9" src="https://github.com/user-attachments/assets/6834e3b9-ddb3-4979-94ac-452fba794247" />

Cloud Run service active and serving traffic
<img width="2048" height="1123" alt="f65074ee-ce9c-4d29-8c1e-53762d78e475" src="https://github.com/user-attachments/assets/825b8590-2117-4301-a902-884720e1546b" />


Public application URL accessible
<img width="2048" height="1242" alt="95aefd91-79de-45b2-a833-944ad1157919" src="https://github.com/user-attachments/assets/1110a6d9-ed62-48dc-b42d-3bbe279179b1" />

<img width="2879" height="1727" alt="Screenshot 2026-01-08 020707" src="https://github.com/user-attachments/assets/f0058626-d051-4ac9-9f07-952170c51b21" />

Live Application URL: https://cloudca1-272999851790.europe-west1.run.app/

## AI Tool Usage Declaration

AI tools (ChatGPT and GitHub Copilot) were used to assist with:

README structuring

CI/CD configuration validation

Debugging deployment issues

All implementation decisions were reviewed and executed manually.

