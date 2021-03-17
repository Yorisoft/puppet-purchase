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
            image.inside("--entrypoint=''") {
                sh ('npm install --unsafe-perm');
                sh ('npm i puppeteer --save');
                sh ('npm -v');
            } 
        } 

        stage('set environment variables') {
            image.inside("--entrypoint=''") {
                withCredentials([
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_EMAIL', variable: 'TEST_USER_EMAIL'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_PASW', variable: 'TEST_USER_PASW'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_EMAIL_PASSW', variable: 'TEST_USER_EMAIL_PASSW'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_LOC', variable: 'TEST_USER_LOC'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_CVV', variable: 'PUPPET_PURCHASE_TEST_USER_CVV'),
                    ]) {
                    echo(" $TEST_USER_EMAIL > $WORKSPACE/grr0.txt"); 
                    sh ("echo ${env.TEST_USER_EMAIL}");
                    sh ("echo ${env.TEST_USER_PASW}");
                    sh ("echo ${env.TEST_USER_EMAIL_PASSW}");
                    sh ("echo ${env.TEST_USER_LOC}");
                    sh ("echo ${env.TEST_USER_CVV}");

                    /* sh ("export MY_EMAIL=${env.PUPPET_PURCHASE_TEST_USER_EMAIL}");
                    sh ("export MY_PASSW=${env.PUPPET_PURCHASE_TEST_USER_PASW}");
                    sh ("export MY_INBOX_PASSW=${env.PUPPET_PURCHASE_TEST_USER_EMAIL_PASSW}");
                    sh ("export MY_LOC=${env.PUPPET_PURCHASE_TEST_USER_LOC}");
                    sh ("export MY_CVV=${env.PUPPET_PURCHASE_TEST_USER_CVV}"); */
                }
            } 
        } 

        // My test user or ip is temporarily banned. Need solution for testing.
        stage('bestuy-bot-test') {
            image.inside("--entrypoint=''") {
                withCredentials([string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_URL_BESTBUY', variable: 'TEST_USER_URL'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_PASW', variable: 'TEST_USER_PASW'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_LOC', variable: 'TEST_USER_LOC'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_CVV', variable: 'PUPPET_PURCHASE_TEST_USER_CVV'),
                    ]) {
                    echo("echo $TEST_USER_URL > $WORKSPACE/grr.txt");
                    sh ('npm run bestbuy-bot-test');
                }
            } 
        }

        stage('target-bot-test') {
            image.inside("--entrypoint=''") {
                withCredentials([string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_URL_TARGET', variable: 'TEST_USER_URL'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_PASW', variable: 'TEST_USER_PASW'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_LOC', variable: 'TEST_USER_LOC'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_CVV', variable: 'PUPPET_PURCHASE_TEST_USER_CVV'),
                    ]) {
                    echo("echo $TEST_USER_URL > $WORKSPACE/grr1.txt");
                    sh ('npm run target-bot-test');
                }
            } 
        }

        stage('newegg-bot-test') {
            image.inside("--entrypoint=''") {
                withCredentials([string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_URL_NEWEGG', variable: 'TEST_USER_URL'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_PASW', variable: 'TEST_USER_PASW'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_EMAIL_PASSW', variable: 'TEST_USER_EMAIL_PASSW'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_LOC', variable: 'TEST_USER_LOC'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_CVV', variable: 'PUPPET_PURCHASE_TEST_USER_CVV'),
                    ]) {
                    echo("echo $TEST_USER_URL > $WORKSPACE/grr2.txt");
                    sh ('npm run newegg-bot-test');
                }
            } 
        }

        // Currently requires manual input.. Need solution to fetching code from email.
        stage('micro-bot-test') {
            image.inside("--entrypoint=''") {
                withCredentials([string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_URL_MICRO', variable: 'TEST_USER_URL'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_PASW', variable: 'TEST_USER_PASW'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_EMAIL_PASSW', variable: 'TEST_USER_EMAIL_PASSW'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_LOC', variable: 'TEST_USER_LOC'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_CVV', variable: 'PUPPET_PURCHASE_TEST_USER_CVV'),
                    ]) {   
                    echo("echo $TEST_USER_URL > $WORKSPACE/grr3.txt");
                    sh ('npm run micro-bot-test');
                }
            } 
        }

        stage('all-bots-full-cycle test') {
            image.inside("--entrypoint=''") {
               /*  sh ("export MY_EMAIL=${env.PUPPET_PURCHASE_TEST_USER_EMAIL}");
                sh ("export MY_PASSW=${env.PUPPET_PURCHASE_TEST_USER_PASW}");
                sh ("export MY_INBOX_PASSW=${env.PUPPET_PURCHASE_TEST_USER_EMAIL_PASSW}");
                sh ("export MY_LOC=${env.PUPPET_PURCHASE_TEST_USER_LOC}");
                sh ("export MY_CVV=${env.PUPPET_PURCHASE_TEST_USER_CVV}");

                sh ("export LISTING_URL=${env.PUPPET_PURCHASE_TEST_USER_URL_MICRO}");
                sh ("export LISTING_URL=${env.PUPPET_PURCHASE_TEST_USER_URL_MICRO}");
                sh ("export LISTING_URL=${env.PUPPET_PURCHASE_TEST_USER_URL_MICRO}");
                sh ("export LISTING_URL=${env.PUPPET_PURCHASE_TEST_USER_URL_MICRO}");
                echo ('Still in development.. '); */
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
            archiveArtifacts allowEmptyArchive: true, artifacts: '**', excludes: '**/node_modules'; 
            //archiveArtifacts allowEmptyArchive: true, artifacts: 'record/screen_shots/newegg/*.png, record/screen_shots/bestbuy/*.png, record/screen_shots/target/*.png'; 
        }
        
        stage('cleanup'){
            cleanWs();
            sh('docker system prune -a -f');
        }
    }
} 