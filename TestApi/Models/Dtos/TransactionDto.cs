using System.ComponentModel.DataAnnotations;

namespace TestApi.Models.Dtos
{
    public class TransactionDto
    {
        public Guid Id { get; set; }
        public string CuastomerName { get; set; }

        public decimal NetAmount { get; set; }
    }
}
