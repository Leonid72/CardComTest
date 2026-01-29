using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TestApi.Interfaces;
using TestApi.Models;
using TestApi.Models.Dtos;

namespace TestApi.Controllers
{
    public class TransactionsController : BaseController
    {
        private readonly ITransactionRepository _repo;
        public TransactionsController(ITransactionRepository repo)
        {
            _repo = repo;
        }

        [HttpPost]
        public async Task<ActionResult<TransactionResponseDto>> GetTransaction(Transaction transaction)
        {
            var res = await _repo.GetAllNetAmountAsync(transaction);
            return Ok(res);
        }
    }
}
