// Write PRIORITY 
#PRIORITY: FIX JENKINS PIPELINE
#PRIORITY: MAKE SERVER MORE SECURE!!!

// Write FIXME
#FIXME: Fix gamestop bot..
#FIXME: test user keeps gets shadow-banned for a period.. 
    - Need to think of solution so that it doesnt slow down dev time

// Write TODO
#TODO: Improve speed efficiency of scripts
    -After it arrives to item listing page
#TODO: Run manually in jenkins
#TODO: Make sure it runs in the server
#TODO: Upgrade to latest jenkins. 
#TODO: Set up ssh keys?
#TODO: Setup vpn
#TODO: Remove ability to create terminal in jenkins


// Write COMPLETE
#COMPLETE TODO: Fix taget screenShotPath error
#COMPLETE TODO: Create selector variable file for bestbuy-bot 
#COMPLETE TODO: Create .env files for each bot
    +   Target
    +   BestBuy
    +   Newegg
#COMPLETE FIXME: Change varible to use env.vars to work with docker.
#COMPLETE PRIORITY: Create test user
    +   Bestbuy
    +   Target
    +   Newegg
#COMPLETE FIXME: findlisting 'Error: No node found for selector: .zip-code-input'
#COMPLETE TODO: Integrate with Jenkins pipeline
#COMPLETE target bot selector names changed
#COMPLETE Integrate utils.js with myinfo.js
#COMPLETE Create run-all-bots scipt command in package.json
#COMPLETE Add step in all bots to skip last step (purchase button) if running in testing environment
#COMPLETE TODO: Create a MicroCenter bot !!!
#COMPLETE TODO: Create a Walmart bot !!!
#COMPLETE TODO: Update readme.md to include instructions for docker and setting up user information
#COMPLETE FIXME: target screenshots ending up in root folder
#COMPLETE FIXME: edit readme to explain how to properly use newegg-bot
    - No longer needs manual steps!
#COMPLETE TODO:Updated jenkins server to latest version,
	-Had some issues with roleStrategyPlugin that would cause jenkins to exit on startup, had to remove all <authentication> from the config.xml and set useSecurity to false, so that jenkinswould auto generate it. Never pasted back the <authentication>, but somehow jenkins remembers the users, not sure about the user permissions. 
	-Had to tickoff an option in security configuration to enable security again.
#COMPLETE TODO: Convert to run in headless!!
	- Took all night to pull off, but I was able to get through all the errors that came up due to running in headless mode. 
	- Currently testing is halted.. Not sure if I can run this program in headless mode. I think all of these sites are using some sort of bot detection. Tried it with two different account and they both fail at the login attempt. 

#REJECTED TODO: Create Amazon bot
    - Not sure how I'd make it to only buy items sold exclusively by amazon.
    - 