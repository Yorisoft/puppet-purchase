

node {
    if (env.BRANCH_NAME.startsWith('PR')) {
        return;
    }

    def image
    def currentStage;
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
            image.inside("--entrypoint=''") {
                sh('npm install --unsafe-perm');
                //sh ('npm i puppeteer --save');
                sh('npm -v');
            }
        }

        parallel(

            // My test user or ip keeps getting temporarily banned. Need solution for testing..
            currentStage = 'bestuy-bot-test';
            stage(currentStage) {
                image.inside("--entrypoint=''") {
                    withCredentials([string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_URL_BESTBUY', variable: 'TEST_USER_URL'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_EMAIL', variable: 'TEST_USER_EMAIL'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_PASW', variable: 'TEST_USER_PASW'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_LOC', variable: 'TEST_USER_LOC'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_CVV', variable: 'PUPPET_PURCHASE_TEST_USER_CVV')
                    ]) {
                        //echo("echo $TEST_USER_URL > $WORKSPACE/grr.txt");
                        sh('npm run bestbuy-bot-test');
                    }
                }
            }

            currentStage = 'micro-bot-test';
            stage(currentStage) {
                image.inside("--entrypoint=''") {
                    withCredentials([string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_URL_MICRO', variable: 'TEST_USER_URL'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_EMAIL', variable: 'TEST_USER_EMAIL'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_PASW', variable: 'TEST_USER_PASW'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_EMAIL_PASSW', variable: 'TEST_USER_INBOX_PASSW'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_LOC', variable: 'TEST_USER_LOC'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_CVV', variable: 'PUPPET_PURCHASE_TEST_USER_CVV')
                    ]) {
                        //echo("echo $TEST_USER_URL > $WORKSPACE/grr3.txt");
                        sh('npm run micro-bot-test');
                    }
                }
            }

            currentStage = 'newegg-bot-test';
            stage(currentStage) {
                image.inside("--entrypoint=''") {
                    withCredentials([string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_URL_NEWEGG', variable: 'TEST_USER_URL'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_EMAIL', variable: 'TEST_USER_EMAIL'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_PASW', variable: 'TEST_USER_PASW'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_EMAIL_PASSW', variable: 'TEST_USER_INBOX_PASSW'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_LOC', variable: 'TEST_USER_LOC'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_CVV', variable: 'PUPPET_PURCHASE_TEST_USER_CVV')
                    ]) {
                        //echo("echo $TEST_USER_URL > $WORKSPACE/grr2.txt");
                        sh('npm run newegg-bot-test');
                    }
                }
            }

            currentStage = 'target-bot-test';
            stage(currentStage) {
                image.inside("--entrypoint=''") {
                    withCredentials([string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_URL_TARGET', variable: 'TEST_USER_URL'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_EMAIL', variable: 'TEST_USER_EMAIL'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_PASW', variable: 'TEST_USER_PASW'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_LOC', variable: 'TEST_USER_LOC'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_CVV', variable: 'PUPPET_PURCHASE_TEST_USER_CVV')
                    ]) {
                        //echo("echo $TEST_USER_URL > $WORKSPACE/grr1.txt");
                        sh('npm run target-bot-test');
                    }
                }
            }

            currentStage = 'walmart-bot-test';
            stage(currentStage) {
                image.inside("--entrypoint=''") {
                    withCredentials([string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_URL_WALMART', variable: 'TEST_USER_URL'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_EMAIL', variable: 'TEST_USER_EMAIL'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_PASW', variable: 'TEST_USER_PASW'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_EMAIL_PASSW', variable: 'TEST_USER_INBOX_PASSW'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_LOC', variable: 'TEST_USER_LOC'),
                    string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_CVV', variable: 'PUPPET_PURCHASE_TEST_USER_CVV'),
                    ]) {
                        //echo("echo $TEST_USER_URL > $WORKSPACE/grr3.txt");
                        sh('npm run micro-bot-test');
                    }
                }
            }
        )
        currentStage = 'all-bots-full-cycle test';
        stage(currentStage) {
            image.inside("--entrypoint=''") {
                withCredentials([string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_EMAIL', variable: 'TEST_USER_EMAIL'),
                string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_PASW', variable: 'TEST_USER_PASW'),
                string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_EMAIL_PASSW', variable: 'TEST_USER_EMAIL_PASSW'),
                string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_LOC', variable: 'TEST_USER_LOC'),
                string(credentialsId: 'PUPPET_PURCHASE_TEST_USER_CVV', variable: 'PUPPET_PURCHASE_TEST_USER_CVV')
                ]) {

                }
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