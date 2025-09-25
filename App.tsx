"use client";

import { useState, useEffect } from "react";
import { Trash, Plus, X } from "lucide-react";

// Define the Book type
interface Book {
  id: string;
  title: string;
  author: string;
  publishedYear: number;
}
function App() {
// State for books list
  const [books, setBooks] = useState<Book[]>([]);
  
  // State for form inputs
  const [newBook, setNewBook] = useState<Omit<Book, "id">>({
    title: "",
    author: "",
    publishedYear: new Date().getFullYear(),
  });
  
  // State for UI controls
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  
  // Simulate fetching books from an API
  useEffect(() => {
    // In a real app, this would be an API call
    const mockBooks: Book[] = [
      { id: "1", title: "To Kill a Mockingbird", author: "Harper Lee", publishedYear: 1960 },
      { id: "2", title: "1984", author: "George Orwell", publishedYear: 1949 },
      { id: "3", title: "Pride and Prejudice", author: "Jane Austen", publishedYear: 1813 },
    ];
    setBooks(mockBooks);
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBook({
      ...newBook,
      [name]: name === "publishedYear" ? parseInt(value) || 0 : value,
    });
  };

  // Add a new book
  const handleAddBook = () => {
    if (!newBook.title || !newBook.author || !newBook.publishedYear) {
      alert("Please fill in all fields");
      return;
    }
    
    const bookToAdd: Book = {
      ...newBook,
      id: Date.now().toString(), // Simple ID generation
    };
    
    setBooks([...books, bookToAdd]);
    setNewBook({ title: "", author: "", publishedYear: new Date().getFullYear() });
    setIsAddModalOpen(false);
  };

  // Delete a book
  const handleDeleteBook = () => {
    if (bookToDelete) {
      setBooks(books.filter(book => book.id !== bookToDelete.id));
      setBookToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Book Manager</h1>
          <p className="text-gray-600">Manage your book collection</p>
        </div>

        <div className="mb-6 flex justify-end">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add Book
          </button>
        </div>

        <div className="rounded-md border border-gray-200 bg-white shadow-sm">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Author</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Year</th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {books.length > 0 ? (
                books.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-900">
                      {book.id.slice(-3)}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">{book.title}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{book.author}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{book.publishedYear}</td>
                    <td className="whitespace-nowrap px-4 py-4 text-right text-sm">
                      <button
                        onClick={() => setBookToDelete(book)}
                        className="rounded p-1 text-red-600 hover:bg-red-50"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    No books found. Add your first book!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Add Book Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">Add New Book</h2>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    id="title"
                    name="title"
                    value={newBook.title}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                    Author
                  </label>
                  <input
                    id="author"
                    name="author"
                    value={newBook.author}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="publishedYear" className="block text-sm font-medium text-gray-700">
                    Publication Year
                  </label>
                  <input
                    id="publishedYear"
                    name="publishedYear"
                    type="number"
                    value={newBook.publishedYear}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddBook}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Add Book
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {bookToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-800">Confirm Deletion</h2>
              </div>
              
              <p className="text-gray-600">
                Are you sure you want to delete{" "}
                <span className="font-semibold">"{bookToDelete.title}"</span> by{" "}
                <span className="font-semibold">{bookToDelete.author}</span>? This action cannot be undone.
              </p>
              
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setBookToDelete(null)}
                  className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteBook}
                  className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
 
  
}

export default App
