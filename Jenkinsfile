pipeline {
    agent { 
        dockerfile {
        args '-v $HOME/src:/src'
        } 
    }
    stages {
        stage('Hello') {
            steps {
                sh 'Hello World'
            }
        }
        stage('Setup Personal Info : bestbuy-bot') {
            steps {
                sh 'cd scripts/bestbuy && export myemail=yelsinsepulveda@gmail.com'
            }
        }
        stage('Run: bestbuy-bot') {
            steps {
                sh 'cd scripts/bestbuy && node bestbuy-bot.js'
            }
        }
        stage('Goodbye') {
            steps {
                sh 'Goodbye World'
            }
        }
    }
}
