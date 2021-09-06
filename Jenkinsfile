#!/usr/bin/env groovy

node {
    if (env.BRANCH_NAME.startsWith('PR')) {
        return;
    }

    def image;
    def currentStage;
    def entryPoint = '-d';
    try {
        stage('Cleanup and Checkout') {
            sh("echo Branch_name:${env.BRANCH_NAME}");
            cleanWs();
            checkout([
                $class: 'GitSCM',
                branches: [[name: "${env.BRANCH_NAME}"]],
                doGenerateSubmoduleConfigurations: false,
                extensions: [],
                submoduleCfg: [],
                userRemoteConfigs: [[credentialsId: 'Yorisoft', url: 'https://github.com/Yorisoft/puppet-purchase']]
            ])
        }

        currentStage = 'Build Image';
        stage(currentStage) {
            image = docker.build('puppet-purchase');
        }

        currentStage = 'Install npm';
        stage(currentStage) {
            image.inside(entryPoint) {
                sh('npm install');
                //sh ('npm i puppeteer --save');
                sh('npm -v');
            }
        }

        // currentStage = 'bestuy-bot-test';
        // stage(currentStage) {
        //     image.inside(entryPoint) {
        //             withCredentials([string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_URL_BESTBUY', variable: 'TEST_USER_LISTING_URL'),
        //             string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_EMAIL', variable: 'TEST_USER_EMAIL'),
        //             string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_PASW', variable: 'TEST_USER_PASSW'),
        //             string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_LOC', variable: 'TEST_USER_LOC'),
        //             string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_CVV', variable: 'TEST_USER_CVV')
        //         ]) {
        //             try{ 
        //                 //echo("echo $TEST_USER_URL > $WORKSPACE/grr.txt"); //prints to test file (nick)
        //                 sh('npm run bestbuy-bot-test')
        //             } catch (err){
        //                 echo err.getMessage()
        //                 throw err
                        
        //             }
        //         }
        //     }
        // }

        // currentStage = 'target-bot-test';
        // stage(currentStage) {
        //     image.inside(entryPoint) {
        //             withCredentials([string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_URL_TARGET', variable: 'TEST_USER_LISTING_URL'),
        //             string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_EMAIL', variable: 'TEST_USER_EMAIL'),
        //             string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_PASW', variable: 'TEST_USER_PASSW'),
        //             string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_LOC', variable: 'TEST_USER_LOC'),
        //             string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_CVV', variable: 'TEST_USER_CVV')
        //         ]) {
        //             try{
        //                 //echo("echo $TEST_USER_URL > $WORKSPACE/grr1.txt");
        //                 sh('npm run target-bot-test');
        //             } catch (err){
        //                 echo err.getMessage()
        //                 throw err
        //             }
        //         }
        //     }
        // }

        parallel(
            // My test user or ip keeps getting temporarily banned. Need solution for testing..
            "bestuy-bot-test": {
                image.inside(entryPoint) {
                    withCredentials([string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_URL_BESTBUY', variable: 'TEST_USER_LISTING_URL'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_EMAIL', variable: 'TEST_USER_EMAIL'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_PASW', variable: 'TEST_USER_PASSW'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_LOC', variable: 'TEST_USER_LOC'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_CVV', variable: 'TEST_USER_CVV')
                    ]) {
                        try{ 
                            //echo("echo $TEST_USER_URL > $WORKSPACE/grr.txt"); //prints to test file (nick)
                            sh('npm run bestbuy-bot-test')
                        } 
                        catch (err){
                            echo err.getMessage()
                            throw err
                                
                        }
                    }
                }
            },

            "target-bot-test": {
                image.inside(entryPoint) {
                    withCredentials([string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_URL_TARGET', variable: 'TEST_USER_LISTING_URL'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_EMAIL', variable: 'TEST_USER_EMAIL'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_PASW', variable: 'TEST_USER_PASSW'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_LOC', variable: 'TEST_USER_LOC'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_CVV', variable: 'TEST_USER_CVV')
                    ]) {
                        try{
                            //echo("echo $TEST_USER_URL > $WORKSPACE/grr1.txt");
                            sh('npm run target-bot-test');
                        } 
                        catch (err){
                            echo err.getMessage()
                            throw err
                        }
                    }
                }
            }
            
            // "gamestop-bot-test": {
            //     image.inside(entryPoint) {
            //         withCredentials([string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_URL_GAMESTOP', variable: 'TEST_USER_LISTING_URL'),
            //         string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_EMAIL', variable: 'TEST_USER_EMAIL'),
            //         string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_PASW', variable: 'TEST_USER_PASSW'),
            //         string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_EMAIL_PASSW', variable: 'TEST_USER_INBOX_PASSW'),
            //         string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_LOC', variable: 'TEST_USER_LOC'),
            //         string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_CVV', variable: 'TEST_USER_CVV')
            //         ]) {
            //             //echo("echo $TEST_USER_URL > $WORKSPACE/grr3.txt");
            //             sh('npm run gamestop-bot-test');
            //         }
            //     }
            // },

            // "micro-bot-test": {
            //     image.inside(entryPoint) {
            //         withCredentials([string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_URL_MICRO', variable: 'TEST_USER_LISTING_URL'),
            //         string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_EMAIL', variable: 'TEST_USER_EMAIL'),
            //         string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_PASW', variable: 'TEST_USER_PASSW'),
            //         string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_EMAIL_PASSW', variable: 'TEST_USER_INBOX_PASSW'),
            //         string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_LOC', variable: 'TEST_USER_LOC'),
            //         string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_CVV', variable: 'TEST_USER_CVV')
            //         ]) {
            //             //echo("echo $TEST_USER_URL > $WORKSPACE/grr3.txt");
            //             sh('npm run micro-bot-test');
            //         }
            //     } 
            // },

            // "newegg-bot-test": {
            //     image.inside(entryPoint) {
            //         withCredentials([string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_URL_NEWEGG', variable: 'TEST_USER_LISTING_URL'),
            //         string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_EMAIL', variable: 'TEST_USER_EMAIL'),
            //         string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_PASW', variable: 'TEST_USER_PASSW'),
            //         string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_EMAIL_PASSW', variable: 'TEST_USER_INBOX_PASSW'),
            //         string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_LOC', variable: 'TEST_USER_LOC'),
            //         string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_CVV', variable: 'TEST_USER_CVV')
            //         ]) {
            //             //echo("echo $TEST_USER_URL > $WORKSPACE/grr2.txt");
            //             sh('npm run newegg-bot-test');
            //         }
            //     }
            // },

            // "walmart-bot-test": {
            //     image.inside(entryPoint) {
            //         withCredentials([string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_URL_WALMART', variable: 'TEST_USER_LISTING_URL'),
            //         string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_EMAIL', variable: 'TEST_USER_EMAIL'),
            //         string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_PASW', variable: 'TEST_USER_PASSW'),
            //         string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_EMAIL_PASSW', variable: 'TEST_USER_INBOX_PASSW'),
            //         string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_LOC', variable: 'TEST_USER_LOC'),
            //         string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_CVV', variable: 'TEST_USER_CVV'),
            //         ]) {
            //             //echo("echo $TEST_USER_URL > $WORKSPACE/grr3.txt");
            //             sh('npm run walmart-bot-test');
            //         }
            //     }
            // }
        )

        currentStage = 'all-bots-full-cycle test';
        // stage(currentStage) {
        //     image.inside(entryPoint) {
        //         withCredentials([string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_EMAIL', variable: 'TEST_USER_EMAIL'),
        //         string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_PASW', variable: 'TEST_USER_PASSW'),
        //         string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_EMAIL_PASSW', variable: 'TEST_USER_EMAIL_PASSW'),
        //         string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_LOC', variable: 'TEST_USER_LOC'),
        //         string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_CVV', variable: 'TEST_USER_CVV')
        //         ]) {

        //         }
        //     }
        // }
    }
    catch (e) {
        currentBuild.result = 'FAILURE';
        throw e
    }
    finally {
        stage('Create Archive'){
            archiveArtifacts allowEmptyArchive: true, artifacts: '**', excludes: '**/node_modules/', followSymlinks: false;
            //archiveArtifacts allowEmptyArchive: true, artifacts: 'record/screen_shots/newegg/*.png, record/screen_shots/bestbuy/*.png, record/screen_shots/target/*.png'; 
        }

        stage('cleanup'){
            cleanWs();
            sh('docker system prune -a -f');
        }
    }
}