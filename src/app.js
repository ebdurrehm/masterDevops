const express = require('express');
const exec = require('child_process').exec;
const mailTransporter = require('./transporter');
const app = express();

app.post('/api/webhook', (req, res)=> {
    exec('cd ~/backendURS && git pull', (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return res.status(500).send('error');
        }
        if (stderr) {
            console.log(stderr);
            mailTransporter({ 
            subject: 'The build process failed',
            html: `<h2>The build process failed</h2><p>${stderr}</p>`
        })
            return res.status(500).send('error in git pull command');
        }
        console.log(stdout);

        exec('pm2 restart api', (err, stdout, stderr) => {
            if (err) {
                console.log(err);
                return res.status(500).send('error');
            }
            if (stderr) {
                console.error(stderr);
                mailTransporter({ 
                    subject: 'The build process failed',
                    html: `<h2>The build process failed</h2><p>${stderr}</p>`
                })
                return res.status(500).send('err in pm2 command');
            }
             console.log(stdout);
             mailTransporter({ 
                subject: 'The build process are successfull!',
                html: `<h2>Greetings from Abdurrahim's CI|CD app, look at your site! :)</h2>`
            })
        
             return res.status(200).send('successfull');
        })
    })
})

app.get('/', (req, res) => {
    res.send('app is running');
})

app.post('/admin/webhook', (req, res) => {
    exec('cd ~/URSadmin && git pull', (err, stdout, stderr) => {
          if (err) {
            console.error(err);
            return res.status(500).send('errror');
        }
        if (stderr) {
            console.log(stderr);
            mailTransporter({ 
                subject: 'The build process failed',
                html: `<h2>The build process failed</h2><p>${stderr}</p>`
            })
            return res.status(500).send('error in git pull command');
        }
        console.log(stdout);

        exec('cd ~/URSadmin && npm run build', (err, stdout, stderr) => {
              if (err) {
            console.error(err);
            return res.status(500).send('error');
        }
        if (stderr) {
            console.log(stderr);
            mailTransporter({ 
                subject: 'The build process failed',
                html: `<h2>The build process failed</h2><p>${stderr}</p>`
            })
            return res.status(500).send('error in build command');
        }
        console.log(stdout);

        exec('cd ~/URSadmin && sudo mv build /var/www && cd /var/www', (err, stdout, stderr) => {
              if (err) {
            console.error(err);
            return res.status(500).send('error');
        }
        if (stderr) {
            console.log(stderr);
            mailTransporter({ 
                subject: 'The build process failed',
                html: `<h2>The build process failed</h2><p>${stderr}</p>`
            })
            return res.status(500).send('error in cd /var/wwww command');
        }
        console.log(stdout);
        // send email to user

        exec('cd /var/www && sudo rm -rf admin && sudo mv build admin', (err, stdout, stderr) => {
              if (err) {
            console.error(err);
            return res.status(500).send('error');
        }
        if (stderr) {
            console.log(stderr);
            mailTransporter({ 
                subject: 'The build process failed',
                html: `<h2>The build process failed</h2><p>${stderr}</p>`
            })
            return res.status(500).send('error in replacing admin folder with the build');
        }
        console.log(stdout);
        mailTransporter({ 
            subject: 'The build process are successfull!',
            html: `<h2>Greetings from Abdurrahim's CI|CD app, look at your site! :)</h2>`
        })
        res.status(200).send('successfull');
        })
        })
        })
    })
})

app.post('/backend/ci', (req, res) => {
    exec('cd ~/masterDevops && git pull', (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return res.status(500).send('error');
        }
        if (stderr) {
            console.log(stderr);
            mailTransporter({ 
            subject: 'The build process failed',
            html: `<h2>The build process failed</h2><p>${stderr}</p>`
        })
            return res.status(500).send('error in git pull command');
        }
        console.log(stdout);

        exec('pm2 restart server', (err, stdout, stderr) => {
            if (err) {
                console.log(err);
                return res.status(500).send('error');
            }
            if (stderr) {
                console.error(stderr);
                mailTransporter({ 
                    subject: 'The build process failed',
                    html: `<h2>The build process failed</h2><p>${stderr}</p>`
                })
                return res.status(500).send('err in pm2 command');
            }
             console.log(stdout);
             mailTransporter({ 
                subject: 'The build process are successfull!',
                html: `<h2>Greetings from Abdurrahim's CI|CD app, look at your site! :)</h2>`
            })
        
             return res.status(200).send('successfull');
        })
    })
})

module.exports = app;