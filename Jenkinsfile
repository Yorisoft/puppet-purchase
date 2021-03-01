#!/usr/bin/env groovy

node {
    if(env.BRANCH_NAME.startsWith('PR')){
        return;
    }

    def image
    def entrypoint = "--entrypoint=''"
    try{
        stage('Checkout') {
            sh ("echo Branch_name:${env.BRANCH_NAME}");
            checkout([
                $class: 'GitSCM',
                branches: [[name: "${env.BRANCH_NAME}"]],
                doGenerateSubmoduleConfigurations: false, 
                extensions: [], 
                submoduleCfg: [], 
                userRemoteConfigs: [[credentialsId: 'Yorisoft', url: 'https://github.com/Yorisoft/puppet-purchase' ]]
            ])
        }

        stage('Build Image') {
            image = docker.build('puppet-purchase -p 5901:5901');
        }

        stage('Install npm') {
            image.inside("--entrypoint=''") {
                sh ('npm install -y');
                sh ('npm -v');
            } 
        } 

        stage('all-bots-full-cycle test') {
            image.inside("--entrypoint=''") {
                sh ('npm run all-bots-full-cycle');
            } 
        }
    } 
    catch (all) {
        currentBuild.result = 'FAILURE';
    } 
    finally {
        stage('cleanup'){
            cleanWs();
            sh('docker system prune -a -f')
        }
    }
} 