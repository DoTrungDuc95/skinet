using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IGenericRepository<Product> _productsRepo;
        private readonly IGenericRepository<ProductBrand> _productBrandRepo;
        private readonly IGenericRepository<ProductType> _productTypeRepo;
        private readonly IMapper _mapper;

        public ProductsController(IGenericRepository<Product> productsRepo,
            IGenericRepository<ProductBrand> productBrandRepo,
            IGenericRepository<ProductType> productTypeRepo,
            IMapper mapper)
        {
            _productTypeRepo = productTypeRepo;
            _mapper = mapper;
            _productBrandRepo = productBrandRepo;
            _productsRepo = productsRepo;
        }
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var spec = new ProductsWithTypesAndBrandsSpecification();
            var products = await _productsRepo.ListAsync(spec);
            var res = _mapper.Map<IReadOnlyList<ProductToReturnDto>>(products);
            return Ok(res);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(id);
            var product = await _productsRepo.GetEntityWithSpec(spec);
            var re = _mapper.Map<Product, ProductToReturnDto>(product);
            return Ok(re);
        }

        [HttpGet("brands")]
        public async Task<IActionResult> GetProductBrands()
        {
            var products = await _productBrandRepo.ListAllAsync();
            return Ok(products);
        }

        [HttpGet("types")]
        public async Task<IActionResult> GetProductTypes()
        {
            var products = await _productTypeRepo.ListAllAsync();
            return Ok(products);
        }
    }
}