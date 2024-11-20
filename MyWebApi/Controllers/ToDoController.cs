using Microsoft.AspNetCore.Mvc;
using MyWebApi.Models;
using System.Collections.Generic;

namespace MyWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ToDoController : ControllerBase
    {
        private static List<ToDo> ToDoItems = new List<ToDo>
        {
            new ToDo { Id = 1, Title = "Learn ASP.NET Core", IsCompleted = false },
            new ToDo { Id = 2, Title = "Learn React", IsCompleted = false },
        };

        [HttpGet]
        public ActionResult<IEnumerable<ToDo>> Get()
        {
            return Ok(ToDoItems);
        }

        [HttpGet("{id}")]
        public ActionResult<ToDo> Get(int id)
        {
            var todo = ToDoItems.Find(t => t.Id == id);
            if (todo == null) return NotFound();
            return Ok(todo);
        }

        [HttpPost]
        public ActionResult<ToDo> Post([FromBody] ToDo newToDo)
        {
            newToDo.Id = ToDoItems.Count + 1;
            ToDoItems.Add(newToDo);
            return CreatedAtAction(nameof(Get), new { id = newToDo.Id }, newToDo);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] ToDo updatedToDo)
        {
            var todo = ToDoItems.Find(t => t.Id == id);
            if (todo == null) return NotFound();

            todo.Title = updatedToDo.Title;
            todo.IsCompleted = updatedToDo.IsCompleted;
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todo = ToDoItems.Find(t => t.Id == id);
            if (todo == null) return NotFound();

            ToDoItems.Remove(todo);
            return NoContent();
        }
    }
}
