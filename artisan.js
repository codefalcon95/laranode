const fs = require("fs");
const { exit } = require("process");
// const colors = require("colors");
//make seeder
const artisan = {

    createSeeder : function(seedername)
    {
        if(seedername === undefined)
        {
            console.log("No seeder name specified");
            process.exit()
        }
const default_seeder_text = ` //A new seeder file for ${seedername} \n
module.exports = {
     up: async function() {

        try {
                 //write seeder here 
        } catch (error) {

        }
        },
};

        `;
        fs.writeFileSync(`${__dirname}/seeders/${seedername.replace(' ','').capitalize()}.js`,default_seeder_text,function(err){
                    if(err)
                    {
                        console.log(err)
                    }
           console.log(`${seedername.replace(' ','').capitalize()} seeder created`)

        });
        process.exit()
    },
    createModel : function(model_name)
    {
        if(model_name === undefined)
        {
            console.log("No model name specified");
            process.exit()
        }
const default_model_text = 
`const mongoose = require('mongoose');
 const ${model_name.replace(' ','').capitalize()}Schema = new mongoose.Schema({
     //write your model attribute here

     createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
 });

 module.exports = mongoose.model('${model_name.replace(' ','').capitalize()}', ${model_name.replace(' ','').capitalize()}Schema);
 `;
        fs.writeFileSync(`${__dirname}/models/${model_name.replace(' ','').capitalize()}.js`,default_model_text,function(err){
                    if(err)
                    {
                        console.log(err)
                    }
           console.log(`${model_name.replace(' ','').capitalize()} model created`)

        });
        process.exit()
    }

    ,
    createRoute : function(route_name)
    {
        if(route_name === undefined)
        {
            console.log("No Route name specified");
            process.exit()
        }
const default_route_text = 
`const express = require('express');
const router = express.Router();

router
.route('/route')
.get("/","[controllername].[action]");

module.exports = router;
 `;
        fs.writeFileSync(`${__dirname}/routes/${route_name.replace(' ','').toLowerCase()}.routes.js`,default_route_text,function(err){
                    if(err)
                    {
                        console.log(err)
                    }

        });
        let route_index = `${__dirname}/routes/index.routes.js`;
        let content = `app.use("/api/v1/${route_name.toLowerCase()}", require("./${route_name.toLowerCase()}.routes"));`
        artisan.InsertFileAtIndex(route_index,content);
        console.log(`${route_name.replace(' ','').capitalize()} route created`)
        process.exit()
    },
    InsertFileAtIndex : async function(file_name,content)
    {
        const data = fs.readFileSync(file_name, 'UTF-8');

        var lines = data.split(/\r?\n/);
        
        //preprocess line frm the back and remove \n
        for (let index = (lines.length - 1); index > 0; index--) {
            if(lines[index] === "")
            {
                lines.pop();
                continue
            }else{
                break;
            }
            
        }
        var temp = lines[lines.length - 1];
        lines[lines.length - 1]  = content;
        lines[lines.length] = temp;

        fs.writeFileSync(file_name,"",function(err) {
                
        });
        lines.forEach((line) => {
           
            fs.appendFileSync(file_name,line+"\n",function(err) {
                
            });
        });
    },

    createController : async function(controller_name)
    {
        if(controller_name === undefined)
        {
            console.log("No controller name specified");
            process.exit()
        }
const default_controller_text = 
`module.exports = {
    //enter controller actions here
    
}
 `;
        fs.writeFileSync(`${__dirname}/controllers/${controller_name.replace(' ','').toLowerCase()}.controller.js`,default_controller_text,function(err){
                    if(err)
                    {
                        console.log(err)
                    }

        });
        console.log(`${controller_name.replace(' ','').toLowerCase()} controller created`)

        process.exit()
    },
    runAllSeeder : async function() {
        try {
          var seeders = fs.readdirSync("./seeders/");
    
          for (myseeder of seeders) {
            var seeder = require("./seeders/" + myseeder);
            await seeder.up();
            console.log(myseeder + " seeded ");
          }
        //   exit();
        } catch (error) {
          console.log(error);
        }
      },
      
       runSingleSeeder :  async () => {
        if (process.argv[3] != undefined) {
          try {
            var seeder_name = process.argv[3];
            var seeder = require("./seeders/" + seeder_name);
            await seeder.up();
            console.log(seeder_name + " seeded ");
            process.exit();
          } catch (error) {
            console.log(error + " ");
          }
        } else {
          console.log(process.argv[3]);
        }
      }


 }


String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
switch (process.argv[2] ) 
{
    case "-ms" :
        artisan.createSeeder(process.argv[3]);
        break;
    case "-model":
        artisan.createModel(process.argv[3]);
    case "-route":
        artisan.createRoute(process.argv[3]);
    case "-controller":
        artisan.createController(process.argv[3]);
    case "-run-all-seeder":
         artisan.runAllSeeder();
         break;
    case "-run-single-seeder":
            artisan.runSingleSeeder();
            break;
    default:
        
        console.log("print available commands")
}
    
  


