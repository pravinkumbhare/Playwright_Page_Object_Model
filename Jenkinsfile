pipeline {
    agent any

    tools {
        nodejs "node16" // Adjust to your Jenkins NodeJS tool name
    }

    environment {
        ALLURE_RESULTS_DIR = 'allure-results'
        ALLURE_REPORT_DIR  = 'allure-report'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test'
            }
        }

        stage('Generate Allure Report') {
            steps {
                sh 'npx allure generate $ALLURE_RESULTS_DIR --clean -o $ALLURE_REPORT_DIR'
            }
        }

        stage('Publish Allure Report') {
            steps {
                allure([
                    includeProperties: false,
                    jdk: '',
                    results: [[path: "$ALLURE_RESULTS_DIR"]],
                    reportBuildPolicy: 'ALWAYS'
                ])
            }
        }
    }

    post {
        always {
            echo 'Archiving test videos and screenshots...'
            archiveArtifacts artifacts: 'allure-report/**, test-results/**/*.webm, test-results/**/*.png', fingerprint: true
        }
    }
}
