namespace AngularJSTraining.Core
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class vBrand
    {
        public int Id { get; set; }

        [StringLength(100)]
        public string BrandName { get; set; }
    }
}
