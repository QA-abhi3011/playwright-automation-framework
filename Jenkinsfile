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

        choice(
            name: 'BROWSER',
            choices: ['all', 'chromium', 'firefox'],
            description: 'Select the browser for UI test execution'
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

                    /*
                     * API tests do not require browser selection.
                     */
                    if (params.TEST_SUITE == 'api') {

                        testCommand =
                            'npx playwright test tests/api --project=api --grep-invert @knownIssue'

                    } else {

                        /*
                         * Select the required test suite.
                         */
                        switch (params.TEST_SUITE) {

                            case 'smoke':
                                testCommand =
                                    'npx playwright test --grep @smoke --grep-invert @knownIssue'
                                break

                            case 'regression':
                                testCommand =
                                    'npx playwright test --grep @regression --grep-invert @knownIssue'
                                break

                            case 'ui':
                                testCommand =
                                    'npx playwright test tests/ui --grep-invert @knownIssue'
                                break

                            default:
                                testCommand =
                                    'npx playwright test --grep-invert @knownIssue'
                                break
                        }

                        /*
                         * Apply browser selection.
                         */
                        if (params.BROWSER == 'chromium') {

                            testCommand += ' --project=chromium'

                        } else if (params.BROWSER == 'firefox') {

                            testCommand += ' --project=firefox'

                        } else {

                            testCommand +=
                                ' --project=chromium --project=firefox'

                            /*
                             * Include API tests when running
                             * the complete suite on all projects.
                             */
                            if (params.TEST_SUITE == 'full') {
                                testCommand += ' --project=api'
                            }
                        }
                    }

                    /*
                     * cross-env ensures ENV works correctly
                     * on Windows Jenkins and local environments.
                     */
                    bat "npx cross-env ENV=${params.ENVIRONMENT} ${testCommand}"
                }
            }
        }
    }

    post {
        always {
            script {
                if (fileExists('test-results')) {
                    archiveArtifacts(
                        artifacts: 'test-results/**',
                        allowEmptyArchive: true
                    )
                } else {
                    echo 'No Playwright failure artifacts were generated.'
                }
            }
        }
    }
}