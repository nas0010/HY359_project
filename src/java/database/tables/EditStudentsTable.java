/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package database.tables;

import mainClasses.Student;
import com.google.gson.Gson;
import mainClasses.User;
import database.DB_Connection;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import mainClasses.Borrowing;
import mainClasses.Librarian;

/**
 *
 * @author Mike
 */
public class EditStudentsTable {

 
    public void addStudentFromJSON(String json) throws ClassNotFoundException{
         Student user=jsonToStudent(json);
         addNewStudent(user);
    }
     public void updateStudent(String username, String student_type,
    String email, String password, String firstname, String lastname, String birthdate,
                                 String gender, String country, String city, String address,
                                 String telephone,String department) throws SQLException, ClassNotFoundException{
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        String update="UPDATE students SET  email = '" +email+ "', password = '" +password+
                "', firstname = '"+firstname+ "', lastname = '" +lastname+ "', birthdate = '" +birthdate+
                "', gender = '" +gender+ "', country = '" +country+ "', city = '" +city+
                "', address = '" +address+ "', telephone = '" +telephone+
                "', student_type = '" +student_type+ "', department = '" +department+ "' WHERE username = '"+username+"'";
        stmt.executeUpdate(update);
    }
    public void deleteStudent(String username) throws SQLException,ClassNotFoundException{
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        String update="DELETE FROM students WHERE username='"+ username +"'";
        stmt.execute(update);
    }
    
     public Student jsonToStudent(String json){
         Gson gson = new Gson();

        Student user = gson.fromJson(json, Student.class);
        return user;
    }
    
    public String studentToJSON(Student user){
         Gson gson = new Gson();

        String json = gson.toJson(user, Student.class);
        return json;
    }
    
   
    
    public void updateStudent(String username,String personalpage) throws SQLException, ClassNotFoundException{
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        String update="UPDATE students SET personalpage='"+personalpage+"' WHERE username = '"+username+"'";
        
        stmt.executeUpdate(update);
    }
    
    public void printStudentDetails(String username, String password) throws SQLException, ClassNotFoundException{
         Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM students WHERE username = '" + username + "' AND password='"+password+"'");
            while (rs.next()) {
                System.out.println("===Result===");
                DB_Connection.printResults(rs);
            }

        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
    }
    
    public void printStudentDetails(String username) throws SQLException, ClassNotFoundException{
         Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT user_id FROM students WHERE username = '" + username +"'");
            while (rs.next()) {
                System.out.println("===Result===");
                DB_Connection.printResults(rs);
            }

        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
    }
    
    public String checkUsername(String username) throws SQLException, ClassNotFoundException{
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ResultSet rs;
        
        try {
            rs = stmt.executeQuery("SELECT * FROM students WHERE username = '" + username + "'");
            if(rs.next()){
                String json = DB_Connection.getResultsToJSON(rs);
                return json;
            }
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        } 
        return null;
       
    }
    public String checkEmail(String email) throws SQLException, ClassNotFoundException{
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM students WHERE email = '" + email +"'");
            if(rs.next()){
                String json = DB_Connection.getResultsToJSON(rs);
                return json;
            }
        } catch (Exception e) {
            System.err.println("kako");
            System.err.println(e.getMessage());
        }
        return null;
    }
    
    public String checkID(String id) throws SQLException, ClassNotFoundException{
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM students WHERE student_id = '" + id +"'");
            if(rs.next()){
                String json = DB_Connection.getResultsToJSON(rs);
                return json;
            }
        } catch (Exception e) {
            System.err.println("kako");
            System.err.println(e.getMessage());
        }
        return null;
    }
    
    public Student databaseToStudent(String username, String password) throws SQLException, ClassNotFoundException{
         Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM students WHERE username = '" + username + "' AND password='"+password+"'");
            System.out.println("SELECT * FROM students WHERE username = '" + username + "' AND password='"+password+"'");
            rs.next();
            String json=DB_Connection.getResultsToJSON(rs);
            Gson gson = new Gson();
            Student user = gson.fromJson(json, Student.class);
            return user;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }
    
   public String databaseStudentToJSON(String username, String password) throws SQLException, ClassNotFoundException{
         Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM students WHERE username = '" + username + "' AND password='"+password+"'");
            rs.next();
            String json=DB_Connection.getResultsToJSON(rs);
            return json;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }

    public ArrayList<Student> databaseToStudents() throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ArrayList<Student> students=new ArrayList<Student>();
        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM students");
            while (rs.next()) {
                String json = DB_Connection.getResultsToJSON(rs);
                Gson gson = new Gson();
                Student lib = gson.fromJson(json, Student.class);
                students.add(lib);
            }
            return students;

        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }


     public void createStudentsTable() throws SQLException, ClassNotFoundException {

        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        String query = "CREATE TABLE students "
                + "(user_id INTEGER not NULL AUTO_INCREMENT, "
                + "    username VARCHAR(30) not null unique,"
                + "    email VARCHAR(200) not null unique,	"
                + "    password VARCHAR(32) not null,"
                + "    firstname VARCHAR(30) not null,"
                + "    lastname VARCHAR(30) not null,"
                + "    birthdate DATE not null,"
                + "    gender  VARCHAR (7) not null,"
                + "    country VARCHAR(30) not null,"
                + "    city VARCHAR(50) not null,"
                + "    address VARCHAR(50) not null,"
                + "    student_type VARCHAR(50) not null,"
                + "    student_id VARCHAR(14) not null unique,"
                + "    student_id_from_date DATE not null,"
                + "    student_id_to_date DATE not null,"
                + "   university VARCHAR(50) not null,"
                + "   department VARCHAR(50) not null,"
                + "    lat DOUBLE,"
                + "    lon DOUBLE,"
                + "    telephone VARCHAR(14),"
                + "   personalpage VARCHAR(200),"
                + " PRIMARY KEY ( user_id))";
        stmt.execute(query);
        stmt.close();
    }
    
    
    /**
     * Establish a database connection and add in the database.
     *
     * @throws ClassNotFoundException
     */
    public void addNewStudent(Student user) throws ClassNotFoundException {
        try {
            Connection con = DB_Connection.getConnection();

            Statement stmt = con.createStatement();

            String insertQuery = "INSERT INTO "
                    + " students (username,email,password,firstname,lastname,birthdate,gender,country,city,address,student_type,"
                    + "student_id,student_id_from_date,student_id_to_date,university,department,lat,lon,telephone,personalpage)"
                    + " VALUES ("
                    + "'" + user.getUsername() + "',"
                    + "'" + user.getEmail() + "',"
                    + "'" + user.getPassword() + "',"
                    + "'" + user.getFirstname() + "',"
                    + "'" + user.getLastname() + "',"
                    + "'" + user.getBirthdate() + "',"
                    + "'" + user.getGender() + "',"
                    + "'" + user.getCountry() + "',"
                    + "'" + user.getCity() + "',"
                    + "'" + user.getAddress() + "',"
                    + "'" + user.getStudent_type() + "',"
                    + "'" + user.getStudent_id() + "',"
                    + "'" + user.getStudent_id_from_date() + "',"
                    + "'" + user.getStudent_id_to_date()+ "',"
                    + "'" + user.getUniversity() + "',"
                    + "'" + user.getDepartment() + "',"
                    + "'" + user.getLat() + "',"
                    + "'" + user.getLon() + "',"
                    + "'" + user.getTelephone() + "',"
                    + "'" + user.getPersonalpage()+ "'"
                    + ")";
            //stmt.execute(table);
            System.out.println(insertQuery);
            stmt.executeUpdate(insertQuery);
            System.out.println("# The user was successfully added in the database.");

            /* Get the member id from the database and set it to the member */
            stmt.close();

        } catch (SQLException ex) {
            Logger.getLogger(EditStudentsTable.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

   

}
