/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import com.google.gson.JsonObject;
import database.tables.EditBorrowingTable;
import database.tables.EditStudentsTable;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import mainClasses.Borrowing;
import mainClasses.Student;

/**
 *
 * @author mpampas tainies
 */
public class ActiveBorrowing extends HttpServlet {

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
            out.println("<title>Servlet ActiveBorrowing</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet ActiveBorrowing at " + request.getContextPath() + "</h1>");
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
        processRequest(request, response);
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
        HttpSession session = request.getSession();
        PrintWriter out1 = response.getWriter();

        response.setContentType("application/json; charset=UTF-8");
        response.setCharacterEncoding("UTF-8");

        Calendar cal = Calendar.getInstance(); 
        cal.setTime(new Date()); 
        Date now = cal.getTime();   
        cal.add(Calendar.DATE, 3);      
        Date last = cal.getTime(); 
        SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); 
JsonObject json=new JsonObject();
        EditBorrowingTable borrowingTable = new EditBorrowingTable();
        EditStudentsTable studentTable = new EditStudentsTable();
        if (session.getAttribute("username") != null){
            try {
                System.out.println(ft.format(now));
                System.out.println(ft.format(last));
                Student user = studentTable.databaseToStudent(session.getAttribute("username").toString(),session.getAttribute("password").toString());
                Borrowing bor = borrowingTable.databaseToCurrentBorrowing(ft.format(now),ft.format(last),user.getUser_id());
                
                if (bor == null){
                    response.setStatus(300);
                }else{
                    response.setStatus(200);
                    System.out.print("ok username");
              }

            } catch (SQLException | ClassNotFoundException e) {
                response.setStatus(400);
            }

        }else{
           response.setStatus(300);
    }
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
