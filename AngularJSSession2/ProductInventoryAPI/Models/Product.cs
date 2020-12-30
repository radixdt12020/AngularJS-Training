using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProductInventoryAPI.Models
{
    public class Product
    {
        public int ProdId { get; set; }
        public string ProdCode { get; set; }
        public string ProdName { get; set; }
        public string ProdCategory { get; set; }
        public string ProdBrand { get; set; }
        public string ProdColor { get; set; }
        public decimal? ProdPrice { get; set; }
        public bool? ProdInStock { get; set; }

        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public bool? IsActive { get; set; }
    }
}