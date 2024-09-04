/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import com.google.gson.JsonArray;
import database.tables.EditBooksInLibraryTable;
import database.tables.EditBorrowingTable;
import database.tables.EditLibrarianTable;
import database.tables.EditStudentsTable;
import database.tables.GeneralQueries;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import mainClasses.BookInLibrary;
import mainClasses.Borrowing;
import mainClasses.JSON_Converter;
import mainClasses.Librarian;
import mainClasses.Student;

/**
 *
 * @author mpampas tainies
 */
public class AvailableBook extends HttpServlet {

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
            out.println("<title>Servlet AvailableBook</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet AvailableBook at " + request.getContextPath() + "</h1>");
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
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        HttpSession session = request.getSession(true);
        GeneralQueries qu=new GeneralQueries();
        BookInLibrary book;
        EditStudentsTable student=new EditStudentsTable();
        EditBooksInLibraryTable table=new EditBooksInLibraryTable();
        EditBorrowingTable borrowing=new EditBorrowingTable();
        Borrowing new_b=new Borrowing();
        PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        int libid = Integer.parseInt(request.getParameter("library_id"));
        String isbn=request.getParameter("isbn");
        Calendar cal = Calendar.getInstance(); 
        cal.setTime(new Date()); 
        Date now = cal.getTime(); 
        cal.add(Calendar.MONTH, 1);      
        Date last = cal.getTime(); 
        SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            Student user = student.databaseToStudent(session.getAttribute("username").toString(), session.getAttribute("password").toString());
            book=table.databaseToBookInLibrary(libid);
            new_b.setBookcopy_id(book.getBookcopy_id());
            new_b.setUser_id(user.getUser_id());
            new_b.setToDate(ft.format(last));
            new_b.setFromDate(ft.format(now));
            new_b.setStatus("requested");
            table.updateBookInLibrary("false", isbn, libid);
            borrowing.createNewBorrowing(new_b);
        } catch (SQLException ex) {
            Logger.getLogger(AvailableBook.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(AvailableBook.class.getName()).log(Level.SEVERE, null, ex);
        }
            response.setStatus(200);
            
       

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
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        GeneralQueries qu=new GeneralQueries();
        EditLibrarianTable table=new EditLibrarianTable();
        PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        String isbnn = request.getParameter("isbn");
        StringBuffer sb = new StringBuffer("{\"libraries\":[");
        try {
            ArrayList<Librarian> libraries = qu.allLibrariesHavingABookAvailable(isbnn);
            for (int i = 0 ; i < libraries.size() ; i++){
               sb.append(table.librarianToJSON(libraries.get(i)) + ",");
                
            }
            sb.deleteCharAt(sb.length()-1);
            sb.append("]}");

            System.out.println(sb);
            out.println(sb);
            response.setStatus(200);
            
        } catch (SQLException | ClassNotFoundException ex) {
            response.setStatus(500);
            Logger.getLogger(BorrowedBooks.class.getName()).log(Level.SEVERE, null, ex);
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
