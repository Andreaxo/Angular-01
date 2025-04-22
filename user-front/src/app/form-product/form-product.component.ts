import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ProductoService } from '../servicios/producto.service';
import { Producto } from '../models/producto.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css'],
  imports: [CommonModule, FormsModule]
})
export class CrearProductoComponent implements OnInit {
  nuevoProducto: Producto = {
    id: 0,
    nombre: '',
    descripcion: '',
    precio: 0,
    categoria: ''
  };

  @Output() productoCreado = new EventEmitter<void>();

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productoService.getProductoPorId(+id).subscribe({
        next: data => this.nuevoProducto = data,
        error: err => console.error('Error al obtener producto', err)
      });
    }
  }

  guardarProducto(form: any): void {
    if (this.nuevoProducto.id && this.nuevoProducto.id !== 0) {
      // EDITAR
      this.productoService.actualizarProducto(this.nuevoProducto).subscribe({
        next: () => {
          this.productoCreado.emit();
          form.resetForm();
          this.router.navigate(['/productos']);
        },
        error: err => console.error('Error al actualizar producto', err)
      });
    } else {
      // CREAR
      this.productoService.crearProducto(this.nuevoProducto).subscribe({
        next: () => {
          this.productoCreado.emit();
          form.resetForm();
          this.router.navigate(['/productos']);
        },
        error: err => console.error('Error al crear producto', err)
      });
    }
  }
}
