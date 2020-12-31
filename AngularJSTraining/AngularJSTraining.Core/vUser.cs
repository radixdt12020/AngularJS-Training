namespace AngularJSTraining.Core
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class vUser
    {
        [Key]
        [Column(Order = 0)]
        public int Id { get; set; }

        [StringLength(101)]
        public string FullName { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(100)]
        public string UserName { get; set; }

        [Key]
        [Column(Order = 2)]
        [StringLength(200)]
        public string Password { get; set; }

        [StringLength(200)]
        public string PasswordSalt { get; set; }

        [StringLength(360)]
        public string EmailId { get; set; }
    }
}
