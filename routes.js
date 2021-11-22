const router = require("express").Router();
const pool = require("./db");


router.post("/todos/new", async (req, res) => {
  try {
    const { description } = req.body;

    const newTodos = await pool.query(
      `INSERT INTO todo (description) VALUES ($1) RETURNING *`,
      [description]
    );

    res.json(newTodos.rows[0]);

  } catch (error) {
    console.log(error.message);
  }
});

router.get('/todos', async (req, res) => {
    try {

        const todos = await pool.query("SELECT * FROM todo");
        
        res.status(200).json({
            success: true,
            todos : todos.rows
        });

    } catch (error) {
        console.log(error.message);
    }
})


router.get('/todos/:id', async (req, res) => {
    try {

        const { id } = req.params;

        const todo = await pool.query(`SELECT * FROM todo WHERE todo_id =${id}`);
  
        res.status(200).json({
            success: true,
            todo : todo.rows
        })
        
    } catch (error) {
        console.log(error.message);
    }
})


router.put('/todos/:id', async (req, res) => {
    try {

        const { id } = req.params;
        const { description } = req.body;

        const updatedTodo = await pool.query(
            `UPDATE todo SET description = $1 WHERE todo_id = $2`, [description, id]
        );
  
        res.status(200).json({
            success: true,
            message : "to do updated successfully"
        });
        
    } catch (error) {
        console.log(error.message);
    }
})


router.delete('/todos/:id', async (req, res) => {
    try {

        const { id } = req.params;

        const deleteTodo = await pool.query(
            `DELETE FROM todo WHERE todo_id = $1`, [id]
        );
  
        res.status(200).json({
            success: true,
            message : "To do deleted successfully"
        });
        
    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router;
