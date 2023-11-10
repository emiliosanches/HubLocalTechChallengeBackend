import { Module } from "@nestjs/common";
import { CompaniesUseCasesModule } from "./use-cases/companies-use-cases.module";
import { CompaniesAdapterModule } from "./adapters/adapters.module";

@Module({
  imports: [CompaniesUseCasesModule, CompaniesAdapterModule]
})
export class CompaniesModule {}
