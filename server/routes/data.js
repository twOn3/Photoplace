const express = require('express');
const router = express.Router();
//mysql 서버 연결입니다.


const mysql      = require('mysql');
const dbconfig   = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);

connection.connect();






router.get('/map',(req,res)=>{
    sql = "select * from Marker";
    connection.query(sql,(err,rows)=>{
       if(err){
           
           return res.send(err);
       }
      
            return res.send(rows);
		
        
    })
});

router.get('/Componentpage',(req,res)=>{
    var sql = "select * from Marker"
    connection.query(sql,(err,rows)=>{
       if(err){
           console.log("실패");
           return res.send(err);
       }
       
    	else{
            return res.send(rows);
		}
    })
});

router.post('/Searchpage',(req,res)=>{
	
    
	var userSearch = req.body.search;
    var sql = `SELECT * FROM Marker WHERE title LIKE '%${userSearch}%' OR tag_1 LIKE '%${userSearch}%' OR tag_2 LIKE '%${userSearch}%'`;
	console.log(sql);
    connection.query(sql,(err,rows)=>{
		
       if(err){
           console.log("실패");
           return res.send(err);
       }
      else{
		  	
            return res.send(rows);
		}
        
    })
});

router.post('/Detail/:id',(req,res)=>{
	var userNum = req.body.Num;
    var sql = `SELECT * FROM Marker WHERE num = ${userNum}`;
    connection.query(sql,(err,rows)=>{
		
       if(err){
           console.log("실패");
           return res.send(err);
       }
      else{
		 
            return res.send(rows);
		}
        
    })
});

router.get('/Ranking',(req,res)=>{
	
	
    var sql = `SELECT * FROM Marker LIMIT 20;`;
    connection.query(sql,(err,rows)=>{
		
       if(err){
           
           return res.send(err);
       }
      
		  	
            return res.send(rows);
		
        
    })
});

router.post('/ModalSlider',(req,res)=>{
	
    
	var nums = req.body.nums;
    var sql = `SELECT * FROM Marker WHERE num='${nums}' union SELECT num, marker_num, imageSrc ,1,2,3,4,5,6 FROM slide WHERE marker_num='${nums}'`;
    connection.query(sql,(err,rows)=>{
		
       if(err){
           console.log("실패");
           return res.send(err);
       }
      else{
            return res.send(rows);
		}
        
    })
});

module.exports = router;
