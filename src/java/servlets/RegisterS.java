/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import com.google.gson.Gson;
import database.tables.EditStudentsTable;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import mainClasses.JSON_Converter;
import mainClasses.Student;
import mainClasses.User;

/**
 *
 * @author mpampas tainies
 */
public class RegisterS extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet RegisterS</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet RegisterS at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //processRequest(request, response);
        PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        JSON_Converter jc = new JSON_Converter();
        BufferedReader reader = request.getReader();
        String data = jc.getJSONFromAjax(reader);
        System.out.println(data);
        Gson gson = new Gson();
        HttpSession session=request.getSession(true);

        EditStudentsTable s= new EditStudentsTable();
        String json=null;
        try {
            json = s.databaseStudentToJSON(session.getAttribute("username").toString(),session.getAttribute("password").toString());
        } catch (SQLException | ClassNotFoundException ex) {
            Logger.getLogger(RegisterS.class.getName()).log(Level.SEVERE, null, ex);
        }
            response.setStatus(200);
            out.write(json);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
     //   processRequest(request, response);
        PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        JSON_Converter jc = new JSON_Converter();
        BufferedReader reader = request.getReader();
        String data = jc.getJSONFromAjax(reader);
        System.out.println(data);
        Gson gson = new Gson();

        Student new_u = gson.fromJson(data, Student.class);

            EditStudentsTable student = new EditStudentsTable();

            try {
                student.addStudentFromJSON(data);
                out.print(student.databaseStudentToJSON(new_u.getUsername(),new_u.getPassword()));
                response.setStatus(200); //success
            } catch (ClassNotFoundException | SQLException e) {
                response.setStatus(500); //errror
            }    

        out.flush();
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
