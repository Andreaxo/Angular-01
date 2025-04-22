import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👈 necesario para *ngFor y currency
import { CrearProductoComponent } from '../form-product/form-product.component'; // 👈 tu componente hijo
import { ProductoService } from '../servicios/producto.service';
import { Producto } from '../models/producto.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  standalone: true,
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  imports: [
    CommonModule,        
    FormsModule,   
    CrearProductoComponent  
  ]
})

export class ProductosComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productoService: ProductoService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.productoService.getProductos().subscribe({
      next: data => this.productos = data,
      error: err => console.error('Error al obtener productos', err)
    });
  }

  irACrearProducto() {
    this.router.navigate(['/productos/create'])
  }

  eliminar(id: number): void {
    this.productoService.eliminarProducto(id).subscribe({
      next: () => this.obtenerProductos(),
      error: err => console.error('Error al eliminar producto', err)
    });
  }

  editar(id: number): void {
    this.router.navigate(['/productos/edit', id]);
  }
  
  productoCreado(): void {
    this.obtenerProductos(); // cuando el hijo notifica que se creó un producto
  }

  
}
