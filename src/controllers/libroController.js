const Libro = require('../models/libro');

// GET /libros — devuelve todos los registros
const obtenerTodos = async (req, res) => {
  try {
    const libros = await Libro.findAll();
    res.json(libros);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los libros', detalle: error.message });
  }
};

// GET /libros/:isbn — devuelve un registro por su ISBN
const obtenerUno = async (req, res) => {
  try {
    const libro = await Libro.findByPk(req.params.isbn);
    if (!libro) {
      return res.status(404).json({ error: `No se encontró el libro con ISBN ${req.params.isbn}` });
    }
    res.json(libro);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el libro', detalle: error.message });
  }
};

// POST /libros — crea un nuevo registro con el ISBN proporcionado por el cliente
const crear = async (req, res) => {
  try {
    const { isbn, titulo, autor, año, disponible } = req.body;
    if (!isbn) {
      return res.status(400).json({ error: 'isbn es obligatorio' });
    }
    if (!titulo || !autor) {
      return res.status(400).json({ error: 'titulo y autor son obligatorios' });
    }
    // Si ya existe un libro con ese ISBN, Sequelize lanzará un error de clave duplicada
    const nuevo = await Libro.create({ isbn, titulo, autor, año, disponible });
    res.status(201).json(nuevo);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: `Ya existe un libro con ISBN ${req.body.isbn}` });
    }
    res.status(500).json({ error: 'Error al crear el libro', detalle: error.message });
  }
};

// PUT /libros/:isbn — actualiza los campos de un registro existente (no el ISBN)
const actualizar = async (req, res) => {
  try {
    const libro = await Libro.findByPk(req.params.isbn);
    if (!libro) {
      return res.status(404).json({ error: `No se encontró el libro con ISBN ${req.params.isbn}` });
    }
    const { titulo, autor, año, disponible } = req.body;
    if (!titulo || !autor) {
      return res.status(400).json({ error: 'titulo y autor son obligatorios' });
    }
    // El ISBN no se actualiza: es la clave primaria y no debe cambiar
    await libro.update({ titulo, autor, año, disponible });
    res.json(libro);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el libro', detalle: error.message });
  }
};

// DELETE /libros/:isbn — elimina un registro por su ISBN
const eliminar = async (req, res) => {
  try {
    const libro = await Libro.findByPk(req.params.isbn);
    if (!libro) {
      return res.status(404).json({ error: `No se encontró el libro con ISBN ${req.params.isbn}` });
    }
    await libro.destroy();
    res.json({ mensaje: 'Libro eliminado', eliminado: libro });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el libro', detalle: error.message });
  }
};

module.exports = { obtenerTodos, obtenerUno, crear, actualizar, eliminar };