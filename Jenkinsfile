pipeline {
    agent any

    tools {
        nodejs "NodeJS_20" // Jenkins NodeJS tool name
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/pravinkumbhare/Playwright_Page_Object_Model.git'
            }
        }

        stage('Check Node & NPM Versions') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'node -v'
                        sh 'npm -v'
                        sh 'where node || which node'
                    } else {
                        bat 'node -v'
                        bat 'npm -v'
                        bat 'where node'
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm install'
                    } else {
                        bat 'npm install'
                    }
                }
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npx playwright test --reporter=line,allure-playwright'
                    } else {
                        bat 'npx playwright test --reporter=line,allure-playwright'
                    }
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npx allure generate ./allure-results --clean -o ./allure-report'
                    } else {
                        bat 'npx allure generate ./allure-results --clean -o ./allure-report'
                    }
                }
            }
        }

        stage('Publish Allure Report') {
            steps {
                allure includeProperties: false,
                       jdk: '',
                       results: [[path: 'allure-results']]
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'allure-report/**', fingerprint: true
        }
        failure {
            echo "Build failed! Check the Allure report for details."
        }
    }
}
