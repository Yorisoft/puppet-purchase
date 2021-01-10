#!/usr/bin/env groovy

node {
    if(env.BRANCH_NAME.startsWith('PR')){
        return;
    }

    def image
    try{
        stage('Checkout') {
            sh ("echo Branch_name:${env.BRANCH_NAME}");
            checkout([
                $class: 'GitSCM',
                branches: [[name: "${env.BRANCH_NAME}"]],
                doGenerateSubmoduleConfigurations: false, 
                extensions: [], 
                submoduleCfg: [], 
                userRemoteConfigs: [[ credentialsId: 'Github_token', url: 'https://github.com/Yorisoft/puppet-purchase' ]]
            ])
        }

        stage('Build Image') {
            image = docker.build('puppet-purchase');
        }

        stage('all-bots-full-cycle test') {
            image.inside {
                sh 'npm run bestbuy-bot-test'
            } 
        }
    } 
    catch (e) {
        print "Error: ${e}"
        currentBuild.result = 'FAILURE'
    } 
    finally {
        stage('cleanup'){
            cleanWs()
            sh 'docker ps -a -q'
            sh 'docker images -q -f dangling=true'
        }
    }
}