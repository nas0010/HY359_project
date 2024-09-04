/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import com.google.gson.JsonArray;
import static com.mysql.cj.MysqlType.JSON;
import database.tables.EditBooksInLibraryTable;
import database.tables.EditBorrowingTable;
import database.tables.EditLibrarianTable;
import database.tables.EditReviewsTable;
import database.tables.EditStudentsTable;
import database.tables.GeneralQueries;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import mainClasses.BookInLibrary;
import mainClasses.JSON_Converter;
import mainClasses.Librarian;
import mainClasses.Review;
import mainClasses.Student;

/**
 *
 * @author mpampas tainies
 */
public class BorrowedBooks extends HttpServlet {

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
            out.println("<title>Servlet BorroedBooks</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet BorroedBooks at " + request.getContextPath() + "</h1>");
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
        HttpSession session = request.getSession(true);
        GeneralQueries qu=new GeneralQueries();
        EditStudentsTable student=new EditStudentsTable();
                PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        try {
            Student user = student.databaseToStudent(session.getAttribute("username").toString(), session.getAttribute("password").toString());
            
             JsonArray boba = qu.allEndedBorrowingsOfAStudent(user.getUser_id());
            
            out.write(boba.toString());
            
            response.setStatus(200);
            
        } catch (SQLException | ClassNotFoundException ex) {
            response.setStatus(500);
            Logger.getLogger(BorrowedBooks.class.getName()).log(Level.SEVERE, null, ex);
        }
        

        out.flush();
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
    protected void doPut(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        HttpSession session = request.getSession(true);
        Review rev=new Review();
        BookInLibrary book;
        EditStudentsTable student=new EditStudentsTable();
        EditBorrowingTable table=new EditBorrowingTable();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        int bid = Integer.parseInt(request.getParameter("bid"));
        try {
            Student user = student.databaseToStudent(session.getAttribute("username").toString(), session.getAttribute("password").toString());
            
            table.updateStatus(bid,"returned",user.getUser_id());
            response.setStatus(200);
            
        } catch (SQLException | ClassNotFoundException ex) {
            Logger.getLogger(RateBook.class.getName()).log(Level.SEVERE, null, ex);
            response.setStatus(400);
        }
    }
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        GeneralQueries qu=new GeneralQueries();
        EditLibrarianTable table = new EditLibrarianTable();
        PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        BufferedReader reader = request.getReader();
        JSON_Converter jc=new JSON_Converter();
        String data = jc.getJSONFromAjax(reader);
        HttpSession  session = request.getSession(true);
        int id = (int)session.getAttribute("library_id");
        
        try {
            JsonArray boba = qu.allBorrowingsOfALibrary(id);
            
            out.write(boba.toString());
            
        } catch (SQLException | ClassNotFoundException ex) {
            Logger.getLogger(BorrowedBooks.class.getName()).log(Level.SEVERE, null, ex);
        }
        response.setStatus(200);

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
