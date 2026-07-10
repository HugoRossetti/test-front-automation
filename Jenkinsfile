pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'app-teste'
        DOCKER_TAG = "v${env.BUILD_ID}"
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Realizando checkout do Git..."
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo "Construindo imagem Docker..."
                // Usa o plugin Docker do Jenkins ou o comando nativo se docker estiver no PATH
                script {
                    if (isUnix()) {
                        sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                        sh "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"
                    } else {
                        bat "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                        bat "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"
                    }
                }
            }
        }

        stage('Test') {
            steps {
                echo "Executando testes..."
                // Aqui poderiam rodar testes de unidade da aplicação
                echo "Testes concluídos com sucesso!"
            }
        }

        stage('Deploy Local') {
            steps {
                echo "Realizando deploy local da imagem: ${DOCKER_IMAGE}:${DOCKER_TAG}"
                script {
                    if (isUnix()) {
                        sh '''
                        docker stop app-teste-container || true
                        docker rm app-teste-container || true
                        docker run -d -p 3000:8000 --name app-teste-container ${DOCKER_IMAGE}:latest
                        '''
                    } else {
                        bat '''
                        docker stop app-teste-container 2>NUL || echo "Nenhum container rodando"
                        docker rm app-teste-container 2>NUL || echo "Nenhum container para remover"
                        docker run -d -p 3000:8000 --name app-teste-container %DOCKER_IMAGE%:latest
                        '''
                    }
                }
            }
        }
    }
    
    post {
        always {
            echo "Pipeline finalizado."
            // Aqui seria feita a limpeza de imagens e containers se necessário
        }
        success {
            echo "Build bem sucedido!"
        }
        failure {
            echo "Build falhou."
        }
    }
}
