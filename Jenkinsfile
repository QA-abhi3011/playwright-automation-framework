pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npm run test:ci'
            }
        }
    }
    post {
        always {
            script {
                if (fileExists('test-results')) {
                archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
                } else {
                echo 'No Playwright failure artifacts were generated.'
                }
            }
        }
    }
}