Cloud Computing CA1 – Cloud Run CI/CD Application
Overview

This repository contains a cloud-native Node.js web application developed for Cloud Computing CA1.
The application is fully containerised and deployed on Google Cloud Platform (GCP) using a modern CI/CD pipeline.

The project demonstrates the use of serverless compute, managed NoSQL storage, container registries, and automated deployments in line with CA1 requirements.

Core Requirements Coverage
1. Google Cloud Services Used

Cloud Run
Hosts the containerised Node.js service and provides automatic scaling based on incoming traffic.

Firestore (NoSQL Database)
Stores submitted form data in a collection used by the application backend.

Cloud Build
Implements continuous integration and deployment triggered by GitHub commits.

Artifact Registry
Stores versioned Docker images built during the CI/CD process.

Secret Manager
Handles sensitive credentials securely at runtime (no secrets stored in source control).

Automated Deployment Pipeline

The application is deployed automatically using Cloud Build triggers.

Pipeline Flow

Commit pushed to the main branch

Cloud Build executes cloudbuild.yaml

Docker image is built

Image is pushed to Artifact Registry

Cloud Run service is deployed with the new image

This ensures:

No manual deployments

Fully repeatable builds

Clear audit trail in Cloud Build history

Infrastructure Configuration

Dockerfile
Packages the application using node:20-alpine as the base image.

cloudbuild.yaml
Defines the build, push, and deployment steps with regional configuration.

Cloud Run
Handles scaling, networking, and service availability declaratively.

Application Endpoints
Method	Path	Description
GET	/	Serves the HTML form UI
POST	/submit	Accepts form data and writes to Firestore
Local Development
git clone https://github.com/mikeeggg/CloudCA1.git
cd CloudCA1
npm install
npm start


Application runs locally on:

http://localhost:8080

One-Time GCP Provisioning
Artifact Registry
gcloud artifacts repositories create cloud-run \
  --location=europe-west1 \
  --repository-format=docker

IAM Permissions

The Cloud Build service account was granted:

roles/run.admin

roles/artifactregistry.writer

roles/secretmanager.secretAccessor

roles/iam.serviceAccountUser

Security Considerations

Sensitive credentials are excluded from Git using .gitignore

Secrets are injected at runtime via Secret Manager

IAM roles follow the principle of least privilege

No credentials are baked into Docker images

Cost Analysis

This project relies entirely on serverless and managed services, keeping operational costs minimal.

Service	Cost Model	Estimated Cost
Cloud Run	Pay per request / compute time	$0 – $1 / mo
Firestore	Free tier usage	$0
Artifact Registry	Free tier storage	$0

The application remains well within free tiers for coursework usage.

Deployment Evidence

Cloud Build successful execution

Docker image stored in Artifact Registry

Cloud Run service active and serving traffic

Public URL accessible

Live Application URL:
https://cloudca1-272999851790.europe-west1.run.app

AI Tool Usage Declaration

AI tools (ChatGPT and GitHub Copilot) were used to assist with:

README structuring

CI/CD configuration validation

Debugging deployment issues

All implementation decisions were reviewed and executed manually.
