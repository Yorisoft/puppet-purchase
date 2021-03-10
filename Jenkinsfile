#!/usr/bin/env groovy

node {
    if(env.BRANCH_NAME.startsWith('PR')){
        return;
    }

    def image
    try{
        stage('Cleanup and Checkout') {
            sh ("echo Branch_name:${env.BRANCH_NAME}");
            cleanWs();
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
            image = docker.build('puppet-purchase');
        }

        stage('Install npm') {
            image.inside("--entrypoint='/dockerstartup/vnc_startup.sh'") {
                sh ('npm install --unsafe-perm');
                sh ('npm -v');
            } 
        } 

        // My test user or ip is temporarily banned. Need solution for testing.
        stage('bestuy-bot-test') {
            image.inside("--entrypoint='/dockerstartup/vnc_startup.sh'") {
                echo ('Still in development.. ');
                //sh ('npm run bestbuy-bot-test');
            } 
        }

        stage('target-bot-test') {
            image.inside("--entrypoint='/dockerstartup/vnc_startup.sh'") {
                sh ('npm run target-bot-test');
            } 
        }

        // Currently requires manual input.. Need solution to fetching code from email.
        stage('newegg-bot-test') {
            image.inside("--entrypoint='/dockerstartup/vnc_startup.sh'") {
                sh ('npm run newegg-bot-test');
            } 
        }

        stage('all-bots-full-cycle test') {
            image.inside("--entrypoint='/dockerstartup/vnc_startup.sh'") {
                echo ('Still in development.. ');
                //TODO - Fix newegg bot
                //TODO - Fix bestbuy bot
                // sh ('npm run all-bots-full-cycle');
            } 
        }
    } 
    catch (e) {
        currentBuild.result = 'FAILURE';
        throw e
    } 
    finally {
        stage('Create Archive'){
            archiveArtifacts allowEmptyArchive: true, artifacts: 'record/screen_shots/newegg/*.png, record/screen_shots/bestbuy/*.png, record/screen_shots/target/*.png'; 
        }
        
        stage('cleanup'){
            cleanWs();
            sh('docker system prune -a -f');
        }
    }
} 