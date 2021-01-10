#!/usr/bin/env groovy

node {
    if(env.BRANCH_NAME.startsWith('PR')){
        return;
    }

    def image
    try{
        stage('Checkout') {
            echo ("echo Branch_name:${env.BRANCH_NAME}");
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
            image = docker.build('puppet-purchase', 'PowerShell.exe');
        }

        stage('all-bots-full-cycle test') {
            image.inside() {
                echo ('npm -v')
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
        }
    }
}

/* pipeline {
    agent any
    stages {
        stage('Hello') {
            steps {
                echo 'Hello World'
            }
        }
        stage('Goodbye') {
            steps {
                echo 'Goodbye World'
            }
        }
    }
} */