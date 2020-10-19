<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';
require '../src/config/db.php';

$app = new \Slim\App;


$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

// CORS

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// Register User 

$app->post('/api/signup',function(Request $request, Response $response){

  $db = connect_db();
  $email = $request->getParam('email');
  $pass = $request->getParam('pass');
  $x= strlen($pass);

  if(filter_var($email,FILTER_VALIDATE_EMAIL) && $x>=6 )
  {

  $sql = "INSERT INTO user (email, pass) VALUES 
  ('$email', '$pass')";

if($db->query($sql) === true){
    return $response->withJson(['success' => true]);
    echo "User Successfully  Signedup: ";
} else{
    return $response->withJson(['success' => false]);
    echo "ERROR: Could not able to execute $sql. " . $db->error;
}
  }
  else{
      echo "Please Enter Valid Email";
  }

});

// login user

$app->post('/api/login',function(Request $request, Response $response){

    $db = connect_db();

    $email = $request->getParam('email');
    $pass = $request->getParam('pass');

    $sql = "SELECT * from user where email='{$email}'";
    $result = $db->query($sql);

    if ($result->num_rows > 0) {
        
        while($row = $result->fetch_assoc()) {
             
            $dbemail = $row['email'];
            $dbpass = $row['pass'];

            }
        }
    else if($result->num_rows==0)
    {
        $dbemail=NULL;
        $dbpass=NULL;

    }
      

    if($dbemail == $email &&  $dbpass == $pass)
    {    

        return $response->withJson(['success' => true]);
        echo "You have succesfully log in..";
    }

    else
    {
        return $response->withJson(['success' => false]);
        echo "Your email or password is wrong";
    }
    

});






// Get List Of all the employee

$app->get('/api/employees/{page}', function (Request $request, Response $response) {
    $page = $request->getAttribute('page');
    $db = connect_db();

    $limit=5;
    $start =($page-1)*$limit;

    $sql = "SELECT * from employees limit $start,$limit";
    $result = $db->query($sql);
  
    //$employees = array();
  
// if ($result->num_rows > 0) {
//     // output data of each row
//     while($row = $result->fetch_assoc()) {
//          $employees[]=$row;
//         }
//     }

$employees=$result -> fetch_all(MYSQLI_ASSOC);

  
    echo json_encode($employees);
});


// get single user

$app->get('/api/employee/{id}', function(Request $request, Response $response){
    $id = $request->getAttribute('id');
   
    $db = connect_db();

    $sql = "SELECT * FROM employees WHERE id = $id";

    $result = $db->query($sql);

    $row = $result->fetch_assoc();
    echo json_encode($row);




    
});



// Insert New User

$app->post('/api/employees/add', function (Request $request, Response $response) {

    $db = connect_db();

    $e_name = $request->getParam('e_name');
    $e_salary = $request->getParam('e_salary');
    $e_desi = $request->getParam('e_desi');

    $sql = "INSERT INTO employees (e_name, e_salary, e_desi) VALUES 
    ('$e_name', '$e_salary', '$e_desi')";

if($db->query($sql) === true){
    echo "Records inserted successfully.";
} else{
    echo "ERROR: Could not able to execute $sql. " . $db->error;
}
 

});


// Delete the user from database


$app->delete('/api/employee/delete/{id}', function(Request $request, Response $response){
    $id = $request->getAttribute('id');

     $db =  connect_db();

    $sql = "DELETE FROM employees WHERE id = $id";

    if($db->query($sql) === true){
        echo "Records deleted successfully.";
    } else{
        echo "ERROR: Could not able to execute $sql. " . $db->error;
    }

   
});

// Update employee info



$app->put('/api/employee/update/{id}', function(Request $request, Response $response){

    $id = $request->getAttribute('id'); 


    $db =  connect_db();

    $e_name = $request->getParam('e_name');
    $e_salary = $request->getParam('e_salary');
    $e_desi = $request->getParam('e_desi');

    $sql = "UPDATE employees SET  e_name='$e_name', e_salary='$e_salary', e_desi='$e_desi'
            WHERE id = $id";
    
    if($db->query($sql) === true){
        echo "Records update successfully.";
    } else{
        echo "ERROR: Could not able to execute $sql. " . $db->error;
    }

        
});


$app->run();
