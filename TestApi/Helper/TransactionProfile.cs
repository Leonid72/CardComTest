using AutoMapper;
using TestApi.Models;
using TestApi.Models.Dtos;

namespace TestApi.Helper
{
    public class TransactionProfile : Profile
    {
        public TransactionProfile()
        {
            CreateMap<Transaction, TransactionResponseDto>()
                .ForMember(
                    dest => dest.NetAmount,
                    opt => opt.MapFrom(src => src.Amount * 0.98m)
                );
        }
    }
}
