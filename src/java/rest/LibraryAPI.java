/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import com.google.gson.Gson;
import database.tables.EditBooksInLibraryTable;
import database.tables.EditBooksTable;
import database.tables.EditBorrowingTable;
import java.io.BufferedReader;
import java.sql.SQLException;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import mainClasses.Book;
import mainClasses.JSON_Converter;


/**
 *
 * @author mpampas tainies
 */
@Path("books")
public class LibraryAPI {
    
    @POST
    @Path("/newBook")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Response addBook(String b) throws ClassNotFoundException {
        Gson gson=new Gson();
        Book book=gson.fromJson(b, Book.class);
        
        EditBooksTable table=new EditBooksTable();
        
        table.createNewBook(book);
       /* if (laptops.containsKey(book.getIsbn())) {
            return Response.status(Response.Status.CONFLICT).type("application/json").entity("{\"error\":\"Book Exists\"}").build();
        } else {
            laptops.put(book.getIsbn(), book);
            return Response.status(Response.Status.OK).type("application/json").entity("{\"success\":\"Book Added\"}").build();
        }*/
        return null;
    }
    
    @PUT
    @Path("/bookAvaiability/{isbn}/{library_id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateBook(@PathParam("isbn") String isbn, @PathParam("library_id") int library_id, @HeaderParam("Accept") String acceptHeader) {
       EditBooksInLibraryTable table=new EditBooksInLibraryTable();
        try {
            table.updateBookInLibrary(isbn, library_id);
            /*if (laptops.containsKey(name) == false) {
            return Response.status(Response.Status.NOT_FOUND).type("application/json").entity("{\"error\":\"Laptop Does not Exists\"}").build();
            } else if (quantity <= 0) {
            return Response.status(Response.Status.NOT_ACCEPTABLE).type("application/json").entity("{\"error\":\"Quantity must be over 0\"}").build();
            } else {
            Laptop p = laptops.get(name);
            p.quantity += quantity;
            return Response.status(Response.Status.OK).type("application/json").entity("{\"success\":\"Quantity Updated\"}").build();
            }*/
        } catch (SQLException ex) {
            Logger.getLogger(LibraryAPI.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(LibraryAPI.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }
    
    @Path("/bookStatus/{borrowing_id}/{status}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateStat(@PathParam("borrowing_id") int borrowing_id,@PathParam("status") String status, @HeaderParam("Accept") String acceptHeader) {
       EditBorrowingTable table=new EditBorrowingTable();
        try {
            table.updateStatus(borrowing_id,status);
            /*if (laptops.containsKey(name)== false) {
            return Response.status(Response.Status.NOT_FOUND).type("application/json").entity("{\"error\":\"Laptop Does not Exists\"}").build();
            } else if (quantity <= 0) {
            return Response.status(Response.Status.NOT_ACCEPTABLE).type("application/json").entity("{\"error\":\"Quantity must be over 0\"}").build();
            } else {
            Laptop p = laptops.get(name);
            p.quantity += quantity;
            return Response.status(Response.Status.OK).type("application/json").entity("{\"success\":\"Quantity Updated\"}").build();
            }*/
        } catch (SQLException | ClassNotFoundException ex) {
            Logger.getLogger(LibraryAPI.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }
    
}
