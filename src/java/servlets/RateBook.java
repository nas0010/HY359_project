/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import database.tables.EditBooksInLibraryTable;
import database.tables.EditBorrowingTable;
import database.tables.EditReviewsTable;
import database.tables.EditStudentsTable;
import database.tables.GeneralQueries;
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
import mainClasses.BookInLibrary;
import mainClasses.Borrowing;
import mainClasses.Review;
import mainClasses.Student;

/**
 *
 * @author mpampas tainies
 */
public class RateBook extends HttpServlet {

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
            out.println("<title>Servlet RateBook</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet RateBook at " + request.getContextPath() + "</h1>");
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
        Borrowing book;
        EditStudentsTable student=new EditStudentsTable();
        EditBooksInLibraryTable table=new EditBooksInLibraryTable();
        EditBorrowingTable borrowing=new EditBorrowingTable();
        PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        int bid = Integer.parseInt(request.getParameter("bid"));
        
        try {
            Student user = student.databaseToStudent(session.getAttribute("username").toString(), session.getAttribute("password").toString());
            book=borrowing.databaseToBorrowing(user.getUser_id(), bid);
            if(book==null){
                response.setStatus(200);
            }else{
                response.setStatus(300);
            }
        } catch (SQLException ex) {
            Logger.getLogger(RateBook.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(RateBook.class.getName()).log(Level.SEVERE, null, ex);
        }
            
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
        HttpSession session = request.getSession(true);
        GeneralQueries qu=new GeneralQueries();
        Review rev=new Review();
        BookInLibrary book;
        EditStudentsTable student=new EditStudentsTable();
        EditBooksInLibraryTable table=new EditBooksInLibraryTable();
        EditReviewsTable review=new EditReviewsTable();
        PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        int bid = Integer.parseInt(request.getParameter("bid"));
        String rin = request.getParameter("rateN");
        String rtext=request.getParameter("rateT");
        try {
            Student user = student.databaseToStudent(session.getAttribute("username").toString(), session.getAttribute("password").toString());
            
            book=table.databaseToBookInLibraryB(bid);
            String isbn=book.getIsbn();
            rev.setIsbn(isbn);
            rev.setReviewScore(rin);
            rev.setReviewText(rtext);
            rev.setUser_id(user.getUser_id());
            review.createNewReview(rev);
                response.setStatus(200);
            
        } catch (SQLException | ClassNotFoundException ex) {
            Logger.getLogger(RateBook.class.getName()).log(Level.SEVERE, null, ex);
            response.setStatus(400);
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
