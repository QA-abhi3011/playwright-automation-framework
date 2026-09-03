/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent any

    parameters {
        choice(
            name: 'ENVIRONMENT',
            choices: ['qa', 'dev', 'prod'],
            description: 'Select the target environment for test execution'
        )

        choice(
            name: 'TEST_SUITE',
            choices: ['full', 'smoke', 'regression', 'ui', 'api'],
            description: 'Select the test suite to execute'
        )
    }

    environment {
        ENV = "${params.ENVIRONMENT}"
    }

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
                script {
                    def testCommand

                    switch (params.TEST_SUITE) {

                        case 'smoke':
                            testCommand = 'npm run test:ci:smoke'
                            break

                        case 'regression':
                            testCommand = 'npm run test:ci:regression'
                            break

                        case 'ui':
                            testCommand = 'npm run test:ci:ui'
                            break

                        case 'api':
                            testCommand = 'npm run test:ci:api'
                            break

                        default:
                            testCommand = 'npm run test:ci'
                            break
                    }

                    bat "npx cross-env ENV=${params.ENVIRONMENT} ${testCommand}"
                }
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