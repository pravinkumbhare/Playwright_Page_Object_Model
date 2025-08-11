pipeline {
    agent any

    tools {
        nodejs "NodeJS_20" // Replace with your Jenkins NodeJS tool name
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/pravinkumbhare/Playwright_Page_Object_Model.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // Run tests with Allure results output
                sh 'npx playwright test --reporter=line,allure-playwright'
            }
        }

        stage('Generate Allure Report') {
            steps {
                sh 'npx allure generate ./allure-results --clean -o ./allure-report'
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
