pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = 'mahi2k22/caps-front'
        BACKEND_IMAGE = 'mahi2k22/caps-back'
        GIT_REPOSITORY_URL = 'https://github.com/Mahi2k/student_career_platform'
        KUBE_NAMESPACE = 'CAPS-CAREER-PLATFORM'
        FRONTEND_KUBE_DEPLOYMENT = 'caps-front'
        BACKEND_KUBE_DEPLOYMENT = 'caps-back'
        CLUSTER_NAME = 'caps-career'
        AWS_REGION = ''
    }

    stages {
        stage('Checkout') {
            steps {
                git "$GIT_REPOSITORY_URL"
            }
        }

        stage('Build') {
            steps {
                dir('frontend') {
                    sh 'npm install --force'
                    sh 'npm run build'
                }
            }
            steps {
                dir('backend') {
                    sh 'npm install --force'
                    sh 'npm run build'
                }
            }
        }

        stage('Docker Build') {
            steps {
                dir('frontend') {
                    sh 'docker build -t $FRONTEND_IMAGE .'
                }
                dir('backend') {
                    sh 'docker build -t $BACKEND_IMAGE .'
                }
            }
        }

        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh 'docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD'

                    sh 'docker push $FRONTEND_IMAGE'
                    sh 'docker push $BACKEND_IMAGE'
                }
            }
        }

        stage('Configure Kubernetes') {
            steps {
                script {
                    withCredentials([file(credentialsId: 'aws-credentials', variable: 'AWS_CREDENTIALS')]) {
                        
                        sh "eksctl utils write-kubeconfig --region=$AWS_REGION --name=$CLUSTER_NAME --profile=$AWS_CREDENTIALS"
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    def frontendImage = "$FRONTEND_IMAGE:$BUILD_NUMBER"
                    def backendImage = "$BACKEND_IMAGE:$BUILD_NUMBER"
                    
                    sh "kubectl set image deployment/$FRONTEND_DEPLOYMENT $FRONTEND_DEPLOYMENT=$frontendImage -n $KUBE_NAMESPACE"
                    
                    sh "kubectl set image deployment/$BACKEND_DEPLOYMENT $BACKEND_DEPLOYMENT=$backendImage -n $KUBE_NAMESPACE"
                }
            }
        }
    }
}
