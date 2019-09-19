package ee.ut.monto.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

import ee.ut.monto.model.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ee.ut.monto.repository.CategoryRepository;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class CategoryController {
    @Autowired
    private CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        super();
        this.categoryRepository = categoryRepository;
    }
    @GetMapping("/addcategory")
    public Collection<Category> add(@RequestParam(name = "name") String category) {
        Category newCategory = new Category(category);
        categoryRepository.save(newCategory);
        return categoryRepository.findAll();
    };

    @GetMapping("/categories")
    Collection<Category> categories() {
        return categoryRepository.findAll();
    }

    @GetMapping("/category/{id}")
    ResponseEntity<?> getCategory(@PathVariable Long id) {
        Optional<Category> category = categoryRepository.findById(id);
        return category.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/category")
    ResponseEntity<Category> createCategory(@Valid @RequestBody Category category) throws URISyntaxException {
        Category savedCategory = categoryRepository.save(category);
        return ResponseEntity.created(new URI("/api/category" + savedCategory.getId())).body(savedCategory);
    }

    @PutMapping("/category/{id}")
    ResponseEntity<Category> updateCategory(@Valid @RequestBody Category category) {
        Category updatedCategory = categoryRepository.save(category);
        return ResponseEntity.ok().body(updatedCategory);
    }

    @DeleteMapping("/category/{id}")
    ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        categoryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}