pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'app-teste'
        DOCKER_TAG = "v${env.BUILD_ID}"
    }

    stages {
        stage('Checkout') {
            steps {
                // Em um cenário real, aqui seria feito o checkout do Git
                // checkout scm
                echo "Simulando Checkout do código..."
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

        stage('Deploy (Simulado)') {
            steps {
                echo "Simulando deploy da imagem: ${DOCKER_IMAGE}:${DOCKER_TAG}"
                // Em produção, isso poderia ser um push para um registry ou deploy em um orquestrador (ex: K8s)
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
