-- AlterTable
ALTER TABLE "Todolist" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Todolist" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
