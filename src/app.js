const express = require('express');
const exec = require('child_process').exec;
const ck = require('ckey');
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
            subject: 'The backend app build process failed',
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
                    subject: 'The backedn app build process failed',
                    html: `<h2>The build process failed</h2><p>${stderr}</p>`
                })
                return res.status(500).send('err in pm2 command');
            }
             console.log(stdout);
             mailTransporter({ 
                subject: 'The backend app build process is successfull!',
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
    exec(`cd ~/URSadmin && git pull && npm install`, (err, stdout, stderr) => {
          if (err) {
            console.error(err);
            return res.status(500).send('errror');
        }
        if (stderr) {
            console.log(stderr);
            // mailTransporter({ 
            //     subject: 'The build process failed',
            //     html: `<h2>The build process failed</h2><p>${stderr}</p>`
            // })
            // return res.status(500).send('error in git pull command');
        }
        console.log(stdout);

        exec('cd ~/URSadmin && npm run build', (err, stdout, stderr) => {
              if (err) {
            console.error(err);
            return res.status(500).send('error');
        }
        if (stderr) {
            console.log(stderr);
            // mailTransporter({ 
            //     subject: 'The build process failed',
            //     html: `<h2>The admin app build process failed</h2><p>${stderr}</p>`
            // })
            // return res.status(500).send('error in build command');
        }
        console.log(stdout);

        exec(`cd ~/URSadmin && echo ${ck.SERVER_PASSWRD} | sudo -S mv build /var/www && cd /var/www`, (err, stdout, stderr) => {
              if (err) {
            console.error(err);
            return res.status(500).send('error');
        }
        if (stderr) {
            console.log(stderr);
            // mailTransporter({ 
            //     subject: 'The admin app build process failed',
            //     html: `<h2>The build process failed</h2><p>${stderr}</p>`
            // })
            // return res.status(500).send('error in cd /var/wwww command');
        }
        console.log(stdout);
        // send email to user

        exec(`cd /var/www && echo ${ck.SERVER_PASSWRD} | sudo -S rm -rf admin && sudo mv build admin`, (err, stdout, stderr) => {
              if (err) {
            console.error(err);
            return res.status(500).send('error');
        }
        if (stderr) {
            console.log(stderr);
            // mailTransporter({ 
            //     subject: 'The admin app build process failed',
            //     html: `<h2>The build process failed</h2><p>${stderr}</p>`
            // })
            // return res.status(500).send('error in replacing admin folder with the build');
        }
        console.log(stdout);
        mailTransporter({ 
            subject: 'The admin app build process are successfull!',
            html: `<h2>Greetings from Abdurrahim's CI|CD app, look at your site! :)</h2>`
        })
        res.status(200).send('successfull');
        })
        })
        })
    })
})

app.post('/client/webhook', (req, res) => {
    exec(`cd ~/URSwebsite && git pull && npm install`, (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          return res.status(500).send('errror');
      }
      if (stderr) {
          console.log(stderr);
          // mailTransporter({ 
          //     subject: 'The build process failed',
          //     html: `<h2>The build process failed</h2><p>${stderr}</p>`
          // })
          // return res.status(500).send('error in git pull command');
      }
      console.log(stdout);

      exec(`cd ~/URSwebsite && npm run build`, (err, stdout, stderr) => {
            if (err) {
          console.error(err);
          return res.status(500).send('error');
      }
      if (stderr) {
          console.log(stderr);
          // mailTransporter({ 
          //     subject: 'The build process failed',
          //     html: `<h2>The admin app build process failed</h2><p>${stderr}</p>`
          // })
          // return res.status(500).send('error in build command');
      }
      console.log(stdout);

      exec(`cd ~/URSwebsite && echo ${ck.SERVER_PASSWRD} | sudo -S mv build /var/www && cd /var/www`, (err, stdout, stderr) => {
            if (err) {
          console.error(err);
          return res.status(500).send('error');
      }
      if (stderr) {
          console.log(stderr);
          // mailTransporter({ 
          //     subject: 'The admin app build process failed',
          //     html: `<h2>The build process failed</h2><p>${stderr}</p>`
          // })
          // return res.status(500).send('error in cd /var/wwww command');
      }
      console.log(stdout);
      // send email to user

      exec(`cd /var/www && echo ${ck.SERVER_PASSWRD} | sudo -S rm -rf client && sudo mv build client`, (err, stdout, stderr) => {
            if (err) {
          console.error(err);
          return res.status(500).send('error');
      }
      if (stderr) {
          console.log(stderr);
          // mailTransporter({ 
          //     subject: 'The admin app build process failed',
          //     html: `<h2>The build process failed</h2><p>${stderr}</p>`
          // })
          // return res.status(500).send('error in replacing admin folder with the build');
      }
      console.log(stdout);
      mailTransporter({ 
          subject: 'The client app build process are successfull!',
          html: `<h2>Greetings from Abdurrahim's CI|CD app, look at your site! :)</h2>`
      })
      res.status(200).send('successfull');
      })
      })
      })
  })
})

// app.post('/backend/ci', (req, res) => {
//     exec('cd ~/masterDevops && git pull', (err, stdout, stderr) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).send('error');
//         }
//         if (stderr) {
//             console.log(stderr);
//             mailTransporter({ 
//             subject: 'The build process failed',
//             html: `<h2>The build process failed</h2><p>${stderr}</p>`
//         })
//             return res.status(500).send('error in git pull command');
//         }
//         console.log(stdout);

//         exec('pm2 restart server', (err, stdout, stderr) => {
//             if (err) {
//                 console.log(err);
//                 return res.status(500).send('error');
//             }
//             if (stderr) {
//                 console.error(stderr);
//                 mailTransporter({ 
//                     subject: 'The build process failed',
//                     html: `<h2>The build process failed</h2><p>${stderr}</p>`
//                 })
//                 return res.status(500).send('err in pm2 command');
//             }
//              console.log(stdout);
        
//         })
//     })
// })

module.exports = app;