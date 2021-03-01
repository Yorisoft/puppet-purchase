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
                userRemoteConfigs: [[ url: 'https://github.com/Yorisoft/puppet-purchase' ]]
            ])
        }

        stage('Build Image') {
            image = docker.build('puppet-purchase');
        }

        stage('Install npm') {
            image.inside {
                sh ('npm install --no-optional -y');
            } 
        } 

        stage('all-bots-full-cycle test') {
            image.inside {
                echo ('npm -v');
            } 
        }
    } 
    catch (e) {
        print "Error: ${e}"
        currentBuild.result = 'FAILURE';
    } 
    finally {
        stage('cleanup'){
            cleanWs();
        }
    }
} 